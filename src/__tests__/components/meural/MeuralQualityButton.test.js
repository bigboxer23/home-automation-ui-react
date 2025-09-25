import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import MeuralQualityButton from "../../../components/meural/MeuralQualityButton";
import { renderWithProviders } from "../../../test-utils";
import * as actions from "../../../actions";

// Mock the actions
jest.mock("../../../actions", () => ({
	updateOpenAIQuality: jest.fn(),
}));

describe("MeuralQualityButton", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders Quality label", () => {
		const props = { device: { status: "1" } };
		renderWithProviders(<MeuralQualityButton {...props} />);

		expect(screen.getByText("Quality")).toBeInTheDocument();
	});

	test("renders Standard and HD toggle buttons", () => {
		const props = { device: { status: "1" } };
		renderWithProviders(<MeuralQualityButton {...props} />);

		expect(screen.getByText("Standard")).toBeInTheDocument();
		expect(screen.getByText("HD")).toBeInTheDocument();
	});

	test("defaults to HD quality when no temperature data provided", () => {
		const props = { device: { status: "1" } };
		const { container } = renderWithProviders(
			<MeuralQualityButton {...props} />,
		);

		const hdButton = screen.getByText("HD").closest("button");
		expect(hdButton).toHaveAttribute("aria-pressed", "true");
	});

	test("sets quality from temperature data", () => {
		const props = {
			device: {
				status: "1",
				temperature: JSON.stringify({ quality: "standard" }),
			},
		};
		renderWithProviders(<MeuralQualityButton {...props} />);

		const standardButton = screen.getByText("Standard").closest("button");
		expect(standardButton).toHaveAttribute("aria-pressed", "true");
	});

	test("is visible when device status is 1", () => {
		const props = { device: { status: "1" } };
		const { container } = renderWithProviders(
			<MeuralQualityButton {...props} />,
		);

		const component = container.querySelector(".meural-source-button");
		expect(component).not.toHaveClass("d-none");
	});

	test("is hidden when device status is 0", () => {
		const props = { device: { status: "0" } };
		const { container } = renderWithProviders(
			<MeuralQualityButton {...props} />,
		);

		const component = container.querySelector(".meural-source-button");
		expect(component).toHaveClass("d-none");
	});

	test("is hidden when device status is 4", () => {
		const props = { device: { status: "4" } };
		const { container } = renderWithProviders(
			<MeuralQualityButton {...props} />,
		);

		const component = container.querySelector(".meural-source-button");
		expect(component).toHaveClass("d-none");
	});

	test("calls updateOpenAIQuality with standard when Standard is clicked", () => {
		const props = { device: { status: "1" } };
		renderWithProviders(<MeuralQualityButton {...props} />);

		const standardButton = screen.getByText("Standard").closest("button");
		fireEvent.click(standardButton);

		expect(actions.updateOpenAIQuality).toHaveBeenCalledWith("standard");
	});

	test("calls updateOpenAIQuality with hd when HD is clicked", () => {
		const props = {
			device: {
				status: "1",
				temperature: JSON.stringify({ quality: "standard" }),
			},
		};
		renderWithProviders(<MeuralQualityButton {...props} />);

		const hdButton = screen.getByText("HD").closest("button");
		fireEvent.click(hdButton);

		expect(actions.updateOpenAIQuality).toHaveBeenCalledWith("hd");
	});

	test("does not call updateOpenAIQuality when clicking already selected button", () => {
		const props = { device: { status: "1" } };
		renderWithProviders(<MeuralQualityButton {...props} />);

		const hdButton = screen.getByText("HD").closest("button");
		fireEvent.click(hdButton);

		// Since HD is already selected by default, clicking it shouldn't trigger the action
		expect(actions.updateOpenAIQuality).not.toHaveBeenCalled();
	});

	test("handles missing device prop", () => {
		const props = {};
		renderWithProviders(<MeuralQualityButton {...props} />);

		expect(screen.getByText("Quality")).toBeInTheDocument();
		expect(screen.getByText("Standard")).toBeInTheDocument();
		expect(screen.getByText("HD")).toBeInTheDocument();
	});

	test("has correct CSS classes", () => {
		const props = { device: { status: "1" } };
		const { container } = renderWithProviders(
			<MeuralQualityButton {...props} />,
		);

		const label = container.querySelector(".meural-source-button-label");
		expect(label).toHaveClass("ms-3", "fw-bold", "pt-3", "pb-2");

		const buttons = container.querySelectorAll(".mdi.mdi-check-circle");
		expect(buttons).toHaveLength(2);
	});
});
