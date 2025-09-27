import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils";
import ClimateButton from "../../../components/climate/ClimateButton";

// Mock the connected-react-router push action
jest.mock("../../../utils/navigation", () => ({
	...jest.requireActual("../../../utils/navigation"),
	push: jest.fn(),
}));

describe("ClimateButton", () => {
	const mockState = {
		house: {
			rooms: [
				{
					name: "Climate",
					devices: [
						{
							name: "Water Heater",
							temperature: 120,
							humidity: 0.66,
							level: "2.5",
							status: "1",
						},
						{
							name: "Outside Temperature",
							level: "75 °F",
						},
						{
							name: "Indoor Temperature",
							level: "72",
						},
						{
							name: "Indoor Humidity",
							level: "45%",
						},
						{
							name: "Thermostat Mode",
							level: "2", // Cool mode
						},
					],
				},
			],
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders climate button with text", () => {
		renderWithProviders(<ClimateButton />, {
			preloadedState: mockState,
		});

		expect(screen.getByText("Climate")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("displays water heater gauge icon", () => {
		renderWithProviders(<ClimateButton />, {
			preloadedState: mockState,
		});

		const gaugeIcon = document.querySelector(".mdi-gauge");
		expect(gaugeIcon).toBeInTheDocument();
	});

	test("displays outside temperature", () => {
		renderWithProviders(<ClimateButton />, {
			preloadedState: mockState,
		});

		expect(screen.getByText("75°")).toBeInTheDocument();
	});

	test("displays water heater temperature and energy usage", () => {
		renderWithProviders(<ClimateButton />, {
			preloadedState: mockState,
		});

		expect(screen.getByText("120° / 2.5kWh")).toBeInTheDocument();
	});

	test("applies correct CSS classes", () => {
		renderWithProviders(<ClimateButton />, {
			preloadedState: mockState,
		});

		const button = screen.getByRole("button");
		expect(button).toHaveClass("m-1");
		expect(button).toHaveClass("position-relative");
		expect(button).toHaveClass("d-flex");
		expect(button).toHaveClass("justify-content-center");
	});

	test("handles empty device map gracefully", () => {
		const emptyState = {
			house: {
				rooms: [
					{
						name: "Climate",
						devices: [],
					},
				],
			},
		};

		renderWithProviders(<ClimateButton />, {
			preloadedState: emptyState,
		});

		expect(screen.getByText("Climate")).toBeInTheDocument();
	});

	test("displays low tank gauge state", () => {
		// Test tank 1/3 full
		const lowTankState = {
			house: {
				rooms: [
					{
						name: "Climate",
						devices: [
							{
								name: "Water Heater",
								temperature: 120,
								humidity: 0.33,
								level: "1.5",
								status: "",
							},
						],
					},
				],
			},
		};

		renderWithProviders(<ClimateButton />, {
			preloadedState: lowTankState,
		});

		const gaugeIcon = document.querySelector(".mdi-gauge-low");
		expect(gaugeIcon).toBeInTheDocument();
	});

	test("displays full tank gauge state", () => {
		// Test tank full
		const fullTankState = {
			house: {
				rooms: [
					{
						name: "Climate",
						devices: [
							{
								name: "Water Heater",
								temperature: 120,
								humidity: 1,
								level: "3.0",
								status: "1",
							},
						],
					},
				],
			},
		};

		renderWithProviders(<ClimateButton />, {
			preloadedState: fullTankState,
		});

		const gaugeIcon = document.querySelector(".mdi-gauge-full");
		expect(gaugeIcon).toBeInTheDocument();
	});

	test("shows empty gauge for invalid tank state", () => {
		const emptyTankState = {
			house: {
				rooms: [
					{
						name: "Climate",
						devices: [
							{
								name: "Water Heater",
								temperature: 120,
								humidity: 0,
								level: "0",
								status: "",
							},
						],
					},
				],
			},
		};

		renderWithProviders(<ClimateButton />, {
			preloadedState: emptyTankState,
		});

		const gaugeIcon = document.querySelector(".mdi-gauge-empty");
		expect(gaugeIcon).toBeInTheDocument();
	});
});
