import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils";
import ClimateButton from "../../../components/climate/ClimateButton";

// Mock the connected-react-router push action
vi.mock("../../../utils/navigation", async () => ({
	...(await vi.importActual("../../../utils/navigation")),
	push: vi.fn(),
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
		vi.clearAllMocks();
	});

	test("renders climate button with text", () => {
		renderWithProviders(<ClimateButton />, {
			preloadedState: mockState,
		});

		expect(screen.getByText("Climate")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("displays water heater gauge visual display", () => {
		renderWithProviders(<ClimateButton />, {
			preloadedState: mockState,
		});

		const gaugeDisplay = document.querySelector(".wh-temp-gauge");
		expect(gaugeDisplay).toBeInTheDocument();
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

	test("displays danger state for low tank (<=20%)", () => {
		const lowTankState = {
			house: {
				rooms: [
					{
						name: "Climate",
						devices: [
							{
								name: "Water Heater",
								temperature: 120,
								category: 115,
								humidity: 0.15,
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

		const gaugeDisplay = document.querySelector(".btn-danger");
		expect(gaugeDisplay).toBeInTheDocument();
	});

	test("displays full tank gauge state with appropriate class", () => {
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
								category: 130,
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

		const gaugeDisplay = document.querySelector(".wh-temp-gauge-full");
		expect(gaugeDisplay).toBeInTheDocument();
	});

	test("displays active gauge when compressor is running", () => {
		const activeCompressorState = {
			house: {
				rooms: [
					{
						name: "Climate",
						devices: [
							{
								name: "Water Heater",
								temperature: 120,
								category: 118,
								humidity: 0.66,
								level: "2.5",
								status: "1",
							},
						],
					},
				],
			},
		};

		renderWithProviders(<ClimateButton />, {
			preloadedState: activeCompressorState,
		});

		const gaugeDisplay = document.querySelector(".wh-temp-gauge-active");
		expect(gaugeDisplay).toBeInTheDocument();
	});
});
