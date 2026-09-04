import React from "react";
import { renderWithProviders, createTestStore } from "../../test-utils";
import MainPage from "../../containers/MainPage";
import RoomPage from "../../containers/RoomPage";
import type { RootState } from "../../types";

vi.mock("react-router-dom", async () => {
	return await import("../../__mocks__/react-router-dom");
});

/**
 * mapStateToProps runs during render. Anything it writes back into the store is
 * a mutation React never hears about, and it survives until the next poll
 * replaces the room wholesale.
 */
describe("selectors leave the store alone", () => {
	test("RoomPage does not reorder the store's device array", () => {
		// The device sort puts fans first and battery sensors last, so a sort in
		// place would visibly reorder this.
		const devices = [
			{ id: "m1", name: "Motion Battery", level: "80" },
			{ id: "f1", name: "Ceiling Fan", category: "3", level: "0" },
			{ id: "l1", name: "A Light", category: "2", level: "40" },
		];
		const preloadedState = {
			house: {
				rooms: [{ id: "lr", name: "Living Room", devices }],
				isFetching: false,
				timer: null,
				authError: false,
			},
		} as Partial<RootState>;
		const store = createTestStore(preloadedState);

		renderWithProviders(<RoomPage />, { store });

		expect(
			(store.getState() as RootState).house.rooms[0].devices.map((d) => d.name),
		).toEqual(["Motion Battery", "Ceiling Fan", "A Light"]);
	});

	test("MainPage does not write totalLights onto the store's Scenes room", () => {
		const preloadedState = {
			house: {
				rooms: [
					{ id: "scenes", name: "Scenes", devices: [] },
					{
						id: "kitchen",
						name: "Kitchen",
						devices: [
							{ id: "k1", name: "Kitchen Light", category: "2", status: "1" },
						],
					},
				],
				isFetching: false,
				timer: null,
				authError: false,
			},
		} as Partial<RootState>;
		const store = createTestStore(preloadedState);

		renderWithProviders(<MainPage />, { store });

		const scenes = (store.getState() as RootState).house.rooms.find(
			(room) => room.name === "Scenes",
		);
		expect(scenes!.totalLights).toBeUndefined();
	});
});
