import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import ClimatePageComponent from "../../../components/climate/ClimatePageComponent";
import { renderWithProviders } from "../../../test-utils";

// Mock all the utility functions
jest.mock("../../../containers/ClimatePage", () => ({
	getCurrentOutsideTemp: () => 75,
	getFanModeStyle: (mode, deviceMap) =>
		mode === "1" ? "btn btn-primary active" : "btn btn-secondary",
	getHVACStyle: (mode, deviceMap) =>
		mode === "2" ? "btn btn-primary active" : "btn btn-secondary",
	getThermostatSetPoint: () => 70,
	getThermostatBattery: () => ({ name: "Thermostat Battery", level: "85" }),
	getThermometerItems: () => [
		<div key="thermometer" data-testid="thermometer-item">
			Thermometer
		</div>,
	],
}));

jest.mock("../../../utils/WeatherUtilities", () => ({
	getFormattedTemp: (temp) => `${temp}°F`,
	getTempStyle: () => ({ color: "blue" }),
	getIndoorTempStyle: () => ({ color: "green" }),
	getOutsideHumidity: () => "65%",
}));

jest.mock("../../../components/room/MotionSensorComponent", () => {
	return function MockMotionSensorComponent(props) {
		return <div data-testid="motion-sensor">{props.device.name}</div>;
	};
});

jest.mock("../../../components/ui/IOSSlider", () => {
	return function MockIOSSlider(props) {
		return (
			<input
				data-testid="ios-slider"
				type="range"
				value={props.value}
				onChange={(e) => props.onChange?.(e, parseInt(e.target.value))}
				min={props.min}
				max={props.max}
			/>
		);
	};
});

describe("ClimatePageComponent", () => {
	const mockProps = {
		back: jest.fn(),
		deviceMap: { mockDevice: { status: "1" } },
		sliderChange: jest.fn(),
		slideStop: jest.fn(),
		fanModeChange: jest.fn(),
		hvacModeChange: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders header with Climate title", () => {
		renderWithProviders(<ClimatePageComponent {...mockProps} />);

		expect(screen.getByText("Climate")).toBeInTheDocument();
	});

	test("renders outside temperature and humidity", () => {
		renderWithProviders(<ClimatePageComponent {...mockProps} />);

		expect(screen.getByText("Outside")).toBeInTheDocument();
		expect(screen.getByText("75°F / 65%")).toBeInTheDocument();
	});

	test("renders thermometer items", () => {
		renderWithProviders(<ClimatePageComponent {...mockProps} />);

		expect(screen.getByTestId("thermometer-item")).toBeInTheDocument();
	});

	test("renders fan mode controls", () => {
		renderWithProviders(<ClimatePageComponent {...mockProps} />);

		expect(screen.getByText("Fan Mode")).toBeInTheDocument();
		expect(screen.getByText("On")).toBeInTheDocument();
		expect(screen.getByText("Auto")).toBeInTheDocument();
	});

	test("handles fan mode clicks", () => {
		renderWithProviders(<ClimatePageComponent {...mockProps} />);

		const onButton = screen.getByText("On");
		const autoButton = screen.getByText("Auto");

		fireEvent.click(onButton);
		expect(mockProps.fanModeChange).toHaveBeenCalledWith("1");

		fireEvent.click(autoButton);
		expect(mockProps.fanModeChange).toHaveBeenCalledWith("0");
	});

	test("renders HVAC mode controls", () => {
		renderWithProviders(<ClimatePageComponent {...mockProps} />);

		expect(screen.getByText("HVAC Mode")).toBeInTheDocument();
		expect(screen.getByText("Off")).toBeInTheDocument();
		expect(screen.getByText("Cool")).toBeInTheDocument();
		expect(screen.getByText("Heat")).toBeInTheDocument();
	});

	test("handles HVAC mode clicks", () => {
		renderWithProviders(<ClimatePageComponent {...mockProps} />);

		const offButton = screen.getByText("Off");
		const coolButton = screen.getByText("Cool");
		const heatButton = screen.getByText("Heat");

		fireEvent.click(offButton);
		expect(mockProps.hvacModeChange).toHaveBeenCalledWith("0");

		fireEvent.click(coolButton);
		expect(mockProps.hvacModeChange).toHaveBeenCalledWith("2");

		fireEvent.click(heatButton);
		expect(mockProps.hvacModeChange).toHaveBeenCalledWith("1");
	});

	test("renders thermostat controls", () => {
		renderWithProviders(<ClimatePageComponent {...mockProps} />);

		expect(screen.getByText("Thermostat")).toBeInTheDocument();
		expect(screen.getByText("70°F")).toBeInTheDocument();
		expect(screen.getByTestId("ios-slider")).toBeInTheDocument();
	});

	test("handles slider interactions", () => {
		renderWithProviders(<ClimatePageComponent {...mockProps} />);

		const slider = screen.getByTestId("ios-slider");
		fireEvent.change(slider, { target: { value: "72" } });

		expect(mockProps.sliderChange).toHaveBeenCalled();
	});

	test("renders motion sensor component", () => {
		renderWithProviders(<ClimatePageComponent {...mockProps} />);

		expect(screen.getByTestId("motion-sensor")).toBeInTheDocument();
		expect(screen.getByText("Thermostat Battery")).toBeInTheDocument();
	});

	test("renders background div", () => {
		const { container } = renderWithProviders(
			<ClimatePageComponent {...mockProps} />,
		);

		expect(container.querySelector(".background")).toBeInTheDocument();
	});
});
