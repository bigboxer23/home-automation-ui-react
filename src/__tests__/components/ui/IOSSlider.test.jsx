import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils";
import IOSSlider from "../../../components/ui/IOSSlider";

describe("IOSSlider", () => {
	const mockOnChange = vi.fn();
	const mockOnChangeCommitted = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders iOS styled slider", () => {
		renderWithProviders(
			<IOSSlider
				value={50}
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const slider = document.querySelector(".MuiSlider-root");
		expect(slider).toBeInTheDocument();
	});

	test("renders with correct value", () => {
		renderWithProviders(
			<IOSSlider
				value={75}
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const sliderInput = document.querySelector('input[type="range"]');
		expect(sliderInput).toHaveValue("75");
	});

	test("renders with minimum and maximum values", () => {
		renderWithProviders(
			<IOSSlider
				value={25}
				min={0}
				max={100}
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const sliderInput = document.querySelector('input[type="range"]');
		expect(sliderInput).toHaveAttribute("min", "0");
		expect(sliderInput).toHaveAttribute("max", "100");
		expect(sliderInput).toHaveValue("25");
	});

	test("handles zero value", () => {
		renderWithProviders(
			<IOSSlider
				value={0}
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const sliderInput = document.querySelector('input[type="range"]');
		expect(sliderInput).toHaveValue("0");
	});

	test("handles maximum value", () => {
		renderWithProviders(
			<IOSSlider
				value={100}
				max={100}
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const sliderInput = document.querySelector('input[type="range"]');
		expect(sliderInput).toHaveValue("100");
	});

	test("applies custom styling", () => {
		renderWithProviders(
			<IOSSlider
				value={50}
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const slider = document.querySelector(".MuiSlider-root");
		expect(slider).toBeInTheDocument();

		// Check for thumb element
		const thumb = document.querySelector(".MuiSlider-thumb");
		expect(thumb).toBeInTheDocument();

		// Check for track element
		const track = document.querySelector(".MuiSlider-track");
		expect(track).toBeInTheDocument();

		// Check for rail element
		const rail = document.querySelector(".MuiSlider-rail");
		expect(rail).toBeInTheDocument();
	});

	test("handles onChange events", () => {
		renderWithProviders(
			<IOSSlider
				value={50}
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const sliderInput = document.querySelector('input[type="range"]');
		fireEvent.change(sliderInput, { target: { value: "75" } });

		expect(mockOnChange).toHaveBeenCalled();
	});

	test("handles onChangeCommitted events", () => {
		renderWithProviders(
			<IOSSlider
				value={50}
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const sliderInput = document.querySelector('input[type="range"]');

		// Simulate a complete interaction - mouseDown, change, mouseUp
		fireEvent.mouseDown(sliderInput);
		fireEvent.change(sliderInput, { target: { value: "75" } });
		fireEvent.mouseUp(sliderInput);

		// OnChangeCommitted should be called after the interaction is complete
		expect(mockOnChangeCommitted).toHaveBeenCalled();
	});

	test("renders with step attribute", () => {
		renderWithProviders(
			<IOSSlider
				value={50}
				step={5}
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const sliderInput = document.querySelector('input[type="range"]');
		expect(sliderInput).toHaveAttribute("step", "5");
	});

	test("renders with valueLabelDisplay prop", () => {
		renderWithProviders(
			<IOSSlider
				value={50}
				valueLabelDisplay="on"
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const slider = document.querySelector(".MuiSlider-root");
		expect(slider).toBeInTheDocument();
	});

	test("handles disabled state", () => {
		renderWithProviders(
			<IOSSlider
				value={50}
				disabled
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const sliderInput = document.querySelector('input[type="range"]');
		expect(sliderInput).toBeDisabled();
	});

	test("renders with aria-label for accessibility", () => {
		renderWithProviders(
			<IOSSlider
				value={50}
				aria-label="Volume"
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const sliderInput = document.querySelector('input[type="range"]');
		expect(sliderInput).toHaveAttribute("aria-label", "Volume");
	});

	test("renders with custom color prop", () => {
		renderWithProviders(
			<IOSSlider
				value={50}
				color="primary"
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const slider = document.querySelector(".MuiSlider-root");
		expect(slider).toBeInTheDocument();
	});

	test("handles marks prop", () => {
		const marks = [
			{ value: 0, label: "0" },
			{ value: 50, label: "50" },
			{ value: 100, label: "100" },
		];

		renderWithProviders(
			<IOSSlider
				value={50}
				marks={marks}
				onChange={mockOnChange}
				onChangeCommitted={mockOnChangeCommitted}
			/>,
		);

		const marksElements = document.querySelectorAll(".MuiSlider-mark");
		expect(marksElements.length).toBeGreaterThan(0);
	});
});
