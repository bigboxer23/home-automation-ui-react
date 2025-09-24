import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils";
import MeuralOnOffButton from "../../../components/meural/MeuralOnOffButton";

describe("MeuralOnOffButton", () => {
	const mockDeviceOn = {
		name: "Meural",
		status: "1",
		level: "1.0",
	};

	const mockDeviceOff = {
		name: "Meural",
		status: "0",
		level: "0.0",
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders on/off button with Turn Off text when device is on", () => {
		renderWithProviders(<MeuralOnOffButton device={mockDeviceOn} />);

		expect(screen.getByText("Turn Off")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("renders on/off button with Turn On text when device is off", () => {
		renderWithProviders(<MeuralOnOffButton device={mockDeviceOff} />);

		expect(screen.getByText("Turn On")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("displays frame icon when device is on", () => {
		renderWithProviders(<MeuralOnOffButton device={mockDeviceOn} />);

		const icon = document.querySelector(".mdi-image-frame");
		expect(icon).toBeInTheDocument();
	});

	test("displays filter-frames icon when device is off", () => {
		renderWithProviders(<MeuralOnOffButton device={mockDeviceOff} />);

		const icon = document.querySelector(".mdi-image-filter-frames");
		expect(icon).toBeInTheDocument();
	});

	test("applies correct CSS classes", () => {
		renderWithProviders(<MeuralOnOffButton device={mockDeviceOn} />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("m-1");
		expect(button).toHaveClass("position-relative");
		expect(button).toHaveClass("d-flex");
		expect(button).toHaveClass("justify-content-center");
		expect(button).toHaveClass("house-button");
		expect(button).toHaveClass("btn-lg");
	});

	test("button is clickable", () => {
		renderWithProviders(<MeuralOnOffButton device={mockDeviceOn} />);

		const button = screen.getByRole("button");
		expect(button).not.toBeDisabled();
		expect(button).toBeInTheDocument();
	});

	test("handles undefined device gracefully", () => {
		renderWithProviders(<MeuralOnOffButton device={undefined} />);

		expect(screen.getByText("Turn On")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-image-filter-frames");
		expect(icon).toBeInTheDocument();
	});

	test("handles null device gracefully", () => {
		renderWithProviders(<MeuralOnOffButton device={null} />);

		expect(screen.getByText("Turn On")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-image-filter-frames");
		expect(icon).toBeInTheDocument();
	});

	test("handles device with no level property", () => {
		const deviceNoLevel = {
			name: "Meural",
			status: "1",
		};

		renderWithProviders(<MeuralOnOffButton device={deviceNoLevel} />);

		expect(screen.getByText("Turn On")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-image-filter-frames");
		expect(icon).toBeInTheDocument();
	});

	test("renders within div container", () => {
		const { container } = renderWithProviders(
			<MeuralOnOffButton device={mockDeviceOn} />,
		);

		const divContainer = container.querySelector("div");
		expect(divContainer).toBeInTheDocument();

		const button = divContainer.querySelector("button");
		expect(button).toBeInTheDocument();
	});
});
