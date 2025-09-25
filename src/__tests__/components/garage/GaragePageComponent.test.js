import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import GaragePageComponent from "../../../components/garage/GaragePageComponent";
import { renderWithProviders } from "../../../test-utils";

// Mock the utility functions
jest.mock("../../../containers/GaragePage", () => ({
	getAutoCloseButtonStyle: () => "btn btn-primary",
	getAutoCloseDelay: () => 300,
	getHeader: () => "Garage",
}));

jest.mock("../../../containers/RoomPage", () => ({
	getRoomDimLevel: () => 50,
}));

jest.mock("../../../components/room/RoomUtils", () => ({
	isLight: (device) => device.type === "light",
}));

// Mock the child components
jest.mock("../../../components/room/LightComponent", () => {
	return function MockLightComponent(props) {
		return <div data-testid="light-component">{props.device.name}</div>;
	};
});

jest.mock("../../../components/garage/GarageAutoCloseButton", () => {
	return function MockGarageAutoCloseButton(props) {
		return (
			<button data-testid="auto-close-button" onClick={props.onClick}>
				{props.buttonText}
			</button>
		);
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
				onMouseUp={(e) =>
					props.onChangeCommitted?.(e, parseInt(e.target.value))
				}
				min={props.min}
				max={props.max}
			/>
		);
	};
});

jest.mock("../../../components/ui/IOSSwitch", () => {
	return function MockIOSSwitch(props) {
		return (
			<input
				data-testid="ios-switch"
				type="checkbox"
				checked={props.checked}
				onChange={(e) => props.onChange?.(e)}
			/>
		);
	};
});

describe("GaragePageComponent", () => {
	const mockRoom = {
		id: "garage1",
		devices: [
			{ name: "Garage Light 1", type: "light", status: "1", level: "75" },
			{ name: "Garage Light 2", type: "light", status: "0", level: "0" },
			{ name: "Garage Sensor", type: "sensor", status: "0" },
		],
	};

	const mockProps = {
		back: jest.fn(),
		room: mockRoom,
		sliderChange: jest.fn(),
		slideStop: jest.fn(),
		setDeviceStatus: jest.fn(),
		autoCloseClickHandler: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders header with garage title", () => {
		renderWithProviders(<GaragePageComponent {...mockProps} />);

		expect(screen.getByText("Garage")).toBeInTheDocument();
	});

	test("renders auto-close button", () => {
		renderWithProviders(<GaragePageComponent {...mockProps} />);

		expect(screen.getByTestId("auto-close-button")).toBeInTheDocument();
		expect(screen.getByText("Disable Auto Close")).toBeInTheDocument();
	});

	test("handles auto-close button click", () => {
		renderWithProviders(<GaragePageComponent {...mockProps} />);

		const autoCloseButton = screen.getByTestId("auto-close-button");
		fireEvent.click(autoCloseButton);

		expect(mockProps.autoCloseClickHandler).toHaveBeenCalledWith(300);
	});

	test("renders overall room controls", () => {
		renderWithProviders(<GaragePageComponent {...mockProps} />);

		expect(screen.getByText("Overall Room")).toBeInTheDocument();
		expect(screen.getByTestId("ios-switch")).toBeInTheDocument();
		expect(screen.getByTestId("ios-slider")).toBeInTheDocument();
	});

	test("handles room switch toggle", () => {
		renderWithProviders(<GaragePageComponent {...mockProps} />);

		const roomSwitch = screen.getByTestId("ios-switch");
		fireEvent.click(roomSwitch); // Use click instead of change for checkboxes

		expect(mockProps.setDeviceStatus).toHaveBeenCalledWith("garage1", false);
	});

	test("handles room slider changes", () => {
		renderWithProviders(<GaragePageComponent {...mockProps} />);

		const slider = screen.getByTestId("ios-slider");
		fireEvent.change(slider, { target: { value: "75" } });
		expect(mockProps.sliderChange).toHaveBeenCalled();

		fireEvent.mouseUp(slider, { target: { value: "75" } });
		expect(mockProps.slideStop).toHaveBeenCalledWith(75, "garage1");
	});

	test("renders light components for light devices only", () => {
		renderWithProviders(<GaragePageComponent {...mockProps} />);

		const lightComponents = screen.getAllByTestId("light-component");
		expect(lightComponents).toHaveLength(2);
		expect(screen.getByText("Garage Light 1")).toBeInTheDocument();
		expect(screen.getByText("Garage Light 2")).toBeInTheDocument();
		// Sensor should not be rendered as a light component
		expect(screen.queryByText("Garage Sensor")).not.toBeInTheDocument();
	});

	test("renders background div", () => {
		const { container } = renderWithProviders(
			<GaragePageComponent {...mockProps} />,
		);

		expect(container.querySelector(".background")).toBeInTheDocument();
	});

	test("has correct CSS classes for main container", () => {
		const { container } = renderWithProviders(
			<GaragePageComponent {...mockProps} />,
		);

		const mainContainer = container.querySelector(
			".p-2.w-100.h-100.d-flex.flex-wrap.justify-content-center.align-content-start.room-content",
		);
		expect(mainContainer).toBeInTheDocument();
	});

	test("room switch is checked when room dim level > 0", () => {
		renderWithProviders(<GaragePageComponent {...mockProps} />);

		const roomSwitch = screen.getByTestId("ios-switch");
		expect(roomSwitch).toBeChecked(); // getRoomDimLevel mocked to return 50
	});
});
