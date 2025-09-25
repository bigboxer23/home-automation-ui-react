import React from "react";
import { screen, fireEvent, waitFor, act } from "@testing-library/react";
import MeuralPreviousButton from "../../../components/meural/MeuralPreviousButton";
import { renderWithProviders } from "../../../test-utils";
import * as actions from "../../../actions";

// Mock the actions
jest.mock("../../../actions", () => ({
	previousMeuralImage: jest.fn(),
}));

describe("MeuralPreviousButton", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	test("renders Previous Image button", () => {
		const props = { device: { status: "0" } };
		renderWithProviders(<MeuralPreviousButton {...props} />);

		expect(screen.getByText("Previous Image")).toBeInTheDocument();
	});

	test("button is visible when device status is 0", () => {
		const props = { device: { status: "0" } };
		renderWithProviders(<MeuralPreviousButton {...props} />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass(
			"m-1",
			"position-relative",
			"d-flex",
			"justify-content-center",
		);
		expect(button).not.toHaveClass("d-none");
	});

	test("button is visible when device status is 4", () => {
		const props = { device: { status: "4" } };
		renderWithProviders(<MeuralPreviousButton {...props} />);

		const button = screen.getByRole("button");
		expect(button).not.toHaveClass("d-none");
	});

	test("button is hidden when device status is not 0 or 4", () => {
		const props = { device: { status: "1" } };
		renderWithProviders(<MeuralPreviousButton {...props} />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("d-none");
	});

	test("displays correct icon with flip-horizontal class", () => {
		const props = { device: { status: "0" } };
		const { container } = renderWithProviders(
			<MeuralPreviousButton {...props} />,
		);

		const icon = container.querySelector(".mdi-image-move.flip-horizontal");
		expect(icon).toBeInTheDocument();
	});

	test("calls previousMeuralImage action when button is clicked", () => {
		const props = { device: { status: "0" } };
		renderWithProviders(<MeuralPreviousButton {...props} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(actions.previousMeuralImage).toHaveBeenCalled();
	});

	test("shows snackbar with correct message when clicked", async () => {
		const props = { device: { status: "0" } };
		renderWithProviders(<MeuralPreviousButton {...props} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		await waitFor(() => {
			expect(screen.getByText("Fetching Previous Image")).toBeInTheDocument();
		});
	});

	test("snackbar closes automatically after 3 seconds", async () => {
		const props = { device: { status: "0" } };
		renderWithProviders(<MeuralPreviousButton {...props} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		await waitFor(() => {
			expect(screen.getByText("Fetching Previous Image")).toBeInTheDocument();
		});

		// Fast-forward time wrapped in act
		act(() => {
			jest.advanceTimersByTime(3000);
		});

		await waitFor(() => {
			expect(
				screen.queryByText("Fetching Previous Image"),
			).not.toBeInTheDocument();
		});
	});

	test("handles missing device prop", () => {
		const props = {};
		renderWithProviders(<MeuralPreviousButton {...props} />);

		expect(screen.getByText("Previous Image")).toBeInTheDocument();
		const button = screen.getByRole("button");
		// When device prop is missing, status is undefined, so button should be hidden
		expect(button).toHaveClass("d-none");
	});

	test("snackbar can be closed manually", async () => {
		const props = { device: { status: "0" } };
		renderWithProviders(<MeuralPreviousButton {...props} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		await waitFor(() => {
			expect(screen.getByText("Fetching Previous Image")).toBeInTheDocument();
		});

		// Find and click the close button
		const closeButton = screen.getByRole("button", { name: /close/i });
		fireEvent.click(closeButton);

		await waitFor(() => {
			expect(
				screen.queryByText("Fetching Previous Image"),
			).not.toBeInTheDocument();
		});
	});
});
