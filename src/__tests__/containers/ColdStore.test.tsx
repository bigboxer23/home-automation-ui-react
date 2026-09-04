import React from "react";
import { renderWithProviders } from "../../test-utils";
import CameraPage from "../../containers/CameraPage";
import ClimatePage from "../../containers/ClimatePage";
import ErrorPage from "../../containers/ErrorPage";
import GaragePage from "../../containers/GaragePage";
import HousePage from "../../containers/HousePage";
import MainPage from "../../containers/MainPage";
import MeuralPage from "../../containers/MeuralPage";
import MeuralPromptPage from "../../containers/MeuralPromptPage";
import RoomPage from "../../containers/RoomPage";
import ScenePage from "../../containers/ScenePage";

vi.mock("react-router-dom", async () => {
	return await import("../../__mocks__/react-router-dom");
});

/**
 * Every page renders once against an empty store - before the first
 * /SceneStatus poll returns, and on any direct load or refresh of a sub-page.
 * A page that reaches for its own room without a guard throws here rather than
 * in the browser.
 */
describe("pages render against a cold store", () => {
	const pages: [string, React.ComponentType][] = [
		["MainPage", MainPage],
		["ClimatePage", ClimatePage],
		["HousePage", HousePage],
		["ScenePage", ScenePage],
		["GaragePage", GaragePage],
		["RoomPage", RoomPage],
		["MeuralPage", MeuralPage],
		["MeuralPromptPage", MeuralPromptPage],
		["CameraPage", CameraPage],
		["ErrorPage", ErrorPage],
	];

	test.each(pages)("%s renders with no rooms fetched yet", (_name, Page) => {
		expect(() => renderWithProviders(<Page />)).not.toThrow();
	});

	test.each(pages)(
		"%s renders when the hub reports rooms but not its own",
		(_name, Page) => {
			expect(() =>
				renderWithProviders(<Page />, {
					preloadedState: {
						house: {
							rooms: [{ id: "Kitchen", name: "Kitchen", devices: [] }],
							isFetching: false,
							timer: null,
							authError: false,
						},
					},
				}),
			).not.toThrow();
		},
	);
});
