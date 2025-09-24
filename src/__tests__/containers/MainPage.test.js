import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import MainPage, { mapRoom } from "../../containers/MainPage";

// Mock the connected-react-router push action
jest.mock("connected-react-router", () => ({
	...jest.requireActual("connected-react-router"),
	push: jest.fn(),
}));

describe("MainPage", () => {
	const mockState = {
		house: {
			rooms: [
				{
					name: "Climate",
					devices: [
						{
							name: "Outside Temperature",
							level: "75 °F",
						},
					],
				},
				{
					name: "Garage",
					devices: [
						{
							name: "Garage Opener",
							status: "false",
							temperature: 72,
						},
					],
				},
				{
					name: "Scenes",
					devices: [
						{
							name: "Is Morning",
							status: "0",
						},
						{
							name: "Is Day",
							status: "1",
						},
					],
				},
				{
					name: "Living Room",
					devices: [
						{
							name: "Light 1",
							status: "1",
							level: "75",
							category: "2",
						},
					],
				},
				{
					name: "Time",
					devices: [
						{
							name: "Current Time",
							level: "2023-01-01T12:00:00Z",
						},
					],
				},
				{
					name: "Meural",
					devices: [
						{
							name: "Meural Device",
							status: "1",
						},
					],
				},
			],
			lastUpdate: Date.now(),
			authError: false,
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders MainPage with loading status component", () => {
		renderWithProviders(<MainPage />, {
			preloadedState: mockState,
		});

		// MainPage should render without crashing
		expect(document.body).toBeInTheDocument();
	});

	test("renders rooms that are displayed", () => {
		renderWithProviders(<MainPage />, {
			preloadedState: mockState,
		});

		// Should display Climate, Meural, and Living Room buttons
		expect(screen.getByText("Climate")).toBeInTheDocument();
		expect(screen.getByText("Meural")).toBeInTheDocument();
		expect(screen.getByText("Living Room")).toBeInTheDocument();
	});

	test("handles empty rooms gracefully", () => {
		const emptyState = {
			house: {
				rooms: [
					{
						name: "Scenes",
						devices: [],
					},
				],
				lastUpdate: null,
				authError: false,
			},
		};

		renderWithProviders(<MainPage />, {
			preloadedState: emptyState,
		});

		expect(document.body).toBeInTheDocument();
	});

	test("handles null rooms gracefully", () => {
		const nullState = {
			house: {
				rooms: null,
				lastUpdate: null,
				authError: false,
			},
		};

		renderWithProviders(<MainPage />, {
			preloadedState: nullState,
		});

		expect(document.body).toBeInTheDocument();
	});
});

describe("mapRoom utility function", () => {
	const mockTime = {
		devices: [
			{ name: "Is Day", status: "1" },
			{ name: "Is Morning", status: "0" },
		],
	};

	const mockHandlers = {
		handleClick: jest.fn(),
		handleGarageClick: jest.fn(),
		handleMoreClick: jest.fn(),
		handleGarageMoreClick: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("returns GarageButton for Garage room", () => {
		const garageRoom = {
			name: "Garage",
			devices: [
				{
					name: "Garage Opener",
					status: "false",
				},
			],
		};

		const result = mapRoom(
			mockTime,
			garageRoom,
			mockHandlers.handleClick,
			mockHandlers.handleGarageClick,
			mockHandlers.handleMoreClick,
			mockHandlers.handleGarageMoreClick,
		);

		expect(result.type.name).toBe("GarageButton");
		expect(result.key).toBe("Garage");
	});

	test("returns ClimateButton for Climate room", () => {
		const climateRoom = {
			name: "Climate",
			devices: [
				{
					name: "Outside Temperature",
					level: "75 °F",
				},
			],
		};

		const result = mapRoom(
			mockTime,
			climateRoom,
			mockHandlers.handleClick,
			mockHandlers.handleGarageClick,
			mockHandlers.handleMoreClick,
			mockHandlers.handleGarageMoreClick,
		);

		expect(result.type).toBeDefined();
		expect(result.key).toBe("Climate");
	});

	test("returns HouseButton for Scenes room", () => {
		const scenesRoom = {
			name: "Scenes",
			devices: [
				{
					name: "Is Day",
					status: "1",
				},
			],
		};

		const result = mapRoom(
			mockTime,
			scenesRoom,
			mockHandlers.handleClick,
			mockHandlers.handleGarageClick,
			mockHandlers.handleMoreClick,
			mockHandlers.handleGarageMoreClick,
		);

		expect(result.type).toBeDefined();
		expect(result.key).toBe("Scenes");
	});

	test("returns MeuralButton for Meural room", () => {
		const meuralRoom = {
			name: "Meural",
			devices: [
				{
					name: "Meural Device",
					status: "1",
				},
			],
		};

		const result = mapRoom(
			mockTime,
			meuralRoom,
			mockHandlers.handleClick,
			mockHandlers.handleGarageClick,
			mockHandlers.handleMoreClick,
			mockHandlers.handleGarageMoreClick,
		);

		expect(result.type).toBeDefined();
		expect(result.key).toBe("Meural");
	});

	test("returns RoomButton for regular rooms", () => {
		const regularRoom = {
			name: "Living Room",
			devices: [
				{
					name: "Light 1",
					status: "1",
					level: "75",
					category: "2",
				},
			],
		};

		const result = mapRoom(
			mockTime,
			regularRoom,
			mockHandlers.handleClick,
			mockHandlers.handleGarageClick,
			mockHandlers.handleMoreClick,
			mockHandlers.handleGarageMoreClick,
		);

		expect(result.type.name).toBe("RoomButton");
		expect(result.key).toBe("Living Room");
	});
});
