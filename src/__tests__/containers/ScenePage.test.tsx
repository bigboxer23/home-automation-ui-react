import React from "react";
import { screen } from "@testing-library/react";
import ScenePage from "../../containers/ScenePage";
import { renderWithProviders } from "../../test-utils";
import { mockFetch } from "../../test-utils";

describe("ScenePage", () => {
	const mockRoomsState = {
		house: {
			rooms: [
				{
					name: "Scenes",
					devices: [
						{ id: "scene1", name: "Morning", status: "0" },
						{ id: "scene2", name: "Evening", status: "1" },
						{ id: "scene3", name: "Night", status: "0" },
					],
				},
				{
					name: "Living Room",
					devices: [{ id: "device1", name: "Light", status: "0" }],
				},
			],
		},
	};

	beforeEach(() => {
		mockFetch({ rooms: [] });
		vi.clearAllMocks();
	});

	test("renders ScenePageComponent", () => {
		renderWithProviders(<ScenePage />, {
			preloadedState: mockRoomsState as any,
		});

		expect(screen.getByText("Scenes")).toBeInTheDocument();
	});

	test("passes correct rooms prop from Scenes room", () => {
		renderWithProviders(<ScenePage />, {
			preloadedState: mockRoomsState as any,
		});

		// Should render scene devices from the "Scenes" room
		expect(screen.getByText("Morning On")).toBeInTheDocument();
		expect(screen.getByText("Morning Off")).toBeInTheDocument();
		expect(screen.getByText("Evening On")).toBeInTheDocument();
		expect(screen.getByText("Evening Off")).toBeInTheDocument();
		expect(screen.getByText("Night On")).toBeInTheDocument();
		expect(screen.getByText("Night Off")).toBeInTheDocument();
	});

	test("handles null rooms gracefully", () => {
		const stateWithNullRooms = {
			house: {
				rooms: null,
			},
		};

		renderWithProviders(<ScenePage />, {
			preloadedState: stateWithNullRooms as any,
		});

		// Should still render the basic structure
		expect(screen.getByText("Scenes")).toBeInTheDocument();
	});

	test("handles missing Scenes room", () => {
		const stateWithoutScenesRoom = {
			house: {
				rooms: [
					{
						name: "Living Room",
						devices: [{ id: "device1", name: "Light", status: "0" }],
					},
				],
			},
		};

		renderWithProviders(<ScenePage />, {
			preloadedState: stateWithoutScenesRoom as any,
		});

		// Should still render basic structure but no scenes
		expect(screen.getByText("Scenes")).toBeInTheDocument();
		// No scene devices should be present
		expect(screen.queryByText("Morning On")).not.toBeInTheDocument();
	});

	test("componentDidMount calls fetchStatus", () => {
		// Mock fetch is already set up in beforeEach
		renderWithProviders(<ScenePage />, {
			preloadedState: mockRoomsState as any,
		});

		// Verify that fetch was called during componentDidMount
		expect((globalThis as any).fetch).toHaveBeenCalled();
	});

	test("renders camera buttons for Security and Grow Tent", () => {
		renderWithProviders(<ScenePage />, {
			preloadedState: mockRoomsState as any,
		});

		expect(screen.getByText("Front Door Security")).toBeInTheDocument();
		expect(screen.getByText("Grow Tent")).toBeInTheDocument();
	});

	test("passes empty array when no scenes found", () => {
		const stateWithEmptyScenes = {
			house: {
				rooms: [
					{
						name: "Scenes",
						devices: [],
					},
				],
			},
		};

		renderWithProviders(<ScenePage />, {
			preloadedState: stateWithEmptyScenes as any,
		});

		expect(screen.getByText("Scenes")).toBeInTheDocument();
		// Only camera buttons should be present, no scene buttons
		expect(screen.getByText("Front Door Security")).toBeInTheDocument();
		expect(screen.getByText("Grow Tent")).toBeInTheDocument();
		expect(screen.queryByText("Morning On")).not.toBeInTheDocument();
	});

	test("getSceneRoom function filters correctly", () => {
		renderWithProviders(<ScenePage />, {
			preloadedState: mockRoomsState as any,
		});

		// Verify that only devices from "Scenes" room are displayed
		expect(screen.getByText("Morning On")).toBeInTheDocument();
		// Should not display devices from other rooms
		expect(screen.queryByText("Light")).not.toBeInTheDocument();
	});

	test("renders with correct Redux state mapping", () => {
		const customState = {
			house: {
				rooms: [
					{
						name: "Scenes",
						devices: [{ id: "custom1", name: "Custom Scene", status: "1" }],
					},
				],
			},
		};

		renderWithProviders(<ScenePage />, {
			preloadedState: customState as any,
		});

		expect(screen.getByText("Custom Scene On")).toBeInTheDocument();
		expect(screen.getByText("Custom Scene Off")).toBeInTheDocument();
	});
});
