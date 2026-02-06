import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils";
import LightComponent from "../../../components/room/LightComponent";

describe("LightComponent", () => {
	const mockSliderChange = vi.fn();
	const mockSlideStop = vi.fn();
	const mockSetDeviceStatus = vi.fn();

	const mockLightDevice = {
		id: "light1",
		name: "Living Room Light",
		level: "75",
		status: "1",
		category: "2", // Light category
	};

	const mockFanDevice = {
		id: "fan1",
		name: "Bedroom Fan",
		level: "50",
		status: "1",
		category: "3", // Fan category
	};

	const mockOffLightDevice = {
		id: "light2",
		name: "Kitchen Light",
		level: "0",
		status: "0",
		category: "2",
	};

	const mockNullLevelDevice = {
		id: "light3",
		name: "Bathroom Light",
		level: "NULL",
		status: "0",
		category: "2",
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders light component with device name", () => {
		renderWithProviders(
			<LightComponent
				device={mockLightDevice}
				sliderChange={mockSliderChange}
				slideStop={mockSlideStop}
				setDeviceStatus={mockSetDeviceStatus}
			/>,
		);

		expect(screen.getByText("Living Room Light")).toBeInTheDocument();
	});

	test("displays iOS switch for light control", () => {
		renderWithProviders(
			<LightComponent
				device={mockLightDevice}
				sliderChange={mockSliderChange}
				slideStop={mockSlideStop}
				setDeviceStatus={mockSetDeviceStatus}
			/>,
		);

		const switchElement = document.querySelector(".MuiSwitch-root");
		expect(switchElement).toBeInTheDocument();
	});

	test("displays iOS slider for dimming lights", () => {
		renderWithProviders(
			<LightComponent
				device={mockLightDevice}
				sliderChange={mockSliderChange}
				slideStop={mockSlideStop}
				setDeviceStatus={mockSetDeviceStatus}
			/>,
		);

		const sliderElement = document.querySelector(".MuiSlider-root");
		expect(sliderElement).toBeInTheDocument();
	});

	test("switch is checked when device level is greater than 0", () => {
		renderWithProviders(
			<LightComponent
				device={mockLightDevice}
				sliderChange={mockSliderChange}
				slideStop={mockSlideStop}
				setDeviceStatus={mockSetDeviceStatus}
			/>,
		);

		const switchInput = document.querySelector("input[type='checkbox']");
		expect(switchInput).toBeChecked();
	});

	test("switch is unchecked when device level is 0", () => {
		renderWithProviders(
			<LightComponent
				device={mockOffLightDevice}
				sliderChange={mockSliderChange}
				slideStop={mockSlideStop}
				setDeviceStatus={mockSetDeviceStatus}
			/>,
		);

		const switchInput = document.querySelector("input[type='checkbox']");
		expect(switchInput).not.toBeChecked();
	});

	test("calls setDeviceStatus when switch is toggled on", () => {
		renderWithProviders(
			<LightComponent
				device={mockOffLightDevice}
				sliderChange={mockSliderChange}
				slideStop={mockSlideStop}
				setDeviceStatus={mockSetDeviceStatus}
			/>,
		);

		const switchInput = document.querySelector("input[type='checkbox']");
		fireEvent.click(switchInput!);

		expect(mockSetDeviceStatus).toHaveBeenCalledWith("light2", true);
	});

	test("calls setDeviceStatus when switch is toggled off", () => {
		renderWithProviders(
			<LightComponent
				device={mockLightDevice}
				sliderChange={mockSliderChange}
				slideStop={mockSlideStop}
				setDeviceStatus={mockSetDeviceStatus}
			/>,
		);

		const switchInput = document.querySelector("input[type='checkbox']");
		fireEvent.click(switchInput!);

		expect(mockSetDeviceStatus).toHaveBeenCalledWith("light1", false);
	});

	test("handles NULL level device", () => {
		renderWithProviders(
			<LightComponent
				device={mockNullLevelDevice}
				sliderChange={mockSliderChange}
				slideStop={mockSlideStop}
				setDeviceStatus={mockSetDeviceStatus}
			/>,
		);

		expect(screen.getByText("Bathroom Light")).toBeInTheDocument();
		const switchInput = document.querySelector("input[type='checkbox']");
		expect(switchInput).not.toBeChecked();
	});

	test("applies correct CSS classes for light", () => {
		renderWithProviders(
			<LightComponent
				device={mockLightDevice}
				sliderChange={mockSliderChange}
				slideStop={mockSlideStop}
				setDeviceStatus={mockSetDeviceStatus}
			/>,
		);

		const container = document.querySelector(".light_slider");
		expect(container).toBeInTheDocument();
		expect(container).toHaveClass("p-2");
		expect(container).toHaveClass("w-100");
		expect(container).toHaveClass("h-100");
		expect(container).toHaveClass("d-flex");
		expect(container).toHaveClass("flex-wrap");
		expect(container).toHaveClass("justify-content-center");
		expect(container).toHaveClass("align-content-start");
		expect(container).toHaveClass("mb-2");
	});

	describe("Fan component", () => {
		test("renders fan without slider", () => {
			renderWithProviders(
				<LightComponent
					device={mockFanDevice}
					sliderChange={mockSliderChange}
					slideStop={mockSlideStop}
					setDeviceStatus={mockSetDeviceStatus}
				/>,
			);

			expect(screen.getByText("Bedroom Fan")).toBeInTheDocument();

			// Should have switch but no slider
			const switchElement = document.querySelector(".MuiSwitch-root");
			expect(switchElement).toBeInTheDocument();

			const sliderElement = document.querySelector(".MuiSlider-root");
			expect(sliderElement).not.toBeInTheDocument();
		});

		test("fan switch is checked when level is greater than 0", () => {
			renderWithProviders(
				<LightComponent
					device={mockFanDevice}
					sliderChange={mockSliderChange}
					slideStop={mockSlideStop}
					setDeviceStatus={mockSetDeviceStatus}
				/>,
			);

			const switchInput = document.querySelector("input[type='checkbox']");
			expect(switchInput).toBeChecked();
		});

		test("calls setDeviceStatus when fan switch is toggled", () => {
			renderWithProviders(
				<LightComponent
					device={mockFanDevice}
					sliderChange={mockSliderChange}
					slideStop={mockSlideStop}
					setDeviceStatus={mockSetDeviceStatus}
				/>,
			);

			const switchInput = document.querySelector("input[type='checkbox']");
			fireEvent.click(switchInput!);

			expect(mockSetDeviceStatus).toHaveBeenCalledWith("fan1", false);
		});
	});
});
