import React from "react";
import { screen, fireEvent, waitFor, act } from "@testing-library/react";
import MeuralNextButton from "../../../components/meural/MeuralNextButton";
import { renderWithProviders } from "../../../test-utils";
import * as actions from "../../../actions";

// Mock the actions
vi.mock("../../../actions", () => ({
	nextMeuralImage: vi.fn(),
}));

describe("MeuralNextButton", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers({ shouldAdvanceTime: true });
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test("renders Next Image button when device status is not 1", () => {
		const props = { device: { id: "meural1", name: "Meural", status: "0" } };
		renderWithProviders(<MeuralNextButton {...props} />);

		expect(screen.getByText("Next Image")).toBeInTheDocument();
		expect(screen.getByRole("button")).toHaveClass(
			"mb-3",
			"m-1",
			"position-relative",
			"d-flex",
			"justify-content-center",
		);
	});

	test("renders Generate New Image button when device status is 1", () => {
		const props = { device: { id: "meural1", name: "Meural", status: "1" } };
		renderWithProviders(<MeuralNextButton {...props} />);

		expect(screen.getByText("Generate New Image")).toBeInTheDocument();
	});

	test("displays correct icon for Next Image mode", () => {
		const props = { device: { id: "meural1", name: "Meural", status: "0" } };
		const { container } = renderWithProviders(<MeuralNextButton {...props} />);

		const icon = container.querySelector(".mdi-image-move");
		expect(icon).toBeInTheDocument();
	});

	test("displays correct icon for Generate mode", () => {
		const props = { device: { id: "meural1", name: "Meural", status: "1" } };
		const { container } = renderWithProviders(<MeuralNextButton {...props} />);

		const icon = container.querySelector(".mdi-image-refresh-outline");
		expect(icon).toBeInTheDocument();
	});

	test("calls nextMeuralImage action when button is clicked", () => {
		const props = { device: { id: "meural1", name: "Meural", status: "0" } };
		renderWithProviders(<MeuralNextButton {...props} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(actions.nextMeuralImage).toHaveBeenCalled();
	});

	test("shows snackbar with correct message for Next Image", async () => {
		const props = { device: { id: "meural1", name: "Meural", status: "0" } };
		renderWithProviders(<MeuralNextButton {...props} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		await waitFor(() => {
			expect(screen.getByText("Fetching Next Image")).toBeInTheDocument();
		});
	});

	test("shows snackbar with correct message for Generate mode", async () => {
		const props = { device: { id: "meural1", name: "Meural", status: "1" } };
		renderWithProviders(<MeuralNextButton {...props} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		await waitFor(() => {
			expect(
				screen.getByText("Started Generating New Image"),
			).toBeInTheDocument();
		});
	});

	test("snackbar closes automatically after 3 seconds", async () => {
		const props = { device: { id: "meural1", name: "Meural", status: "0" } };
		renderWithProviders(<MeuralNextButton {...props} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		await waitFor(() => {
			expect(screen.getByText("Fetching Next Image")).toBeInTheDocument();
		});

		// Fast-forward time wrapped in act
		act(() => {
			vi.advanceTimersByTime(3000);
		});

		await waitFor(() => {
			expect(screen.queryByText("Fetching Next Image")).not.toBeInTheDocument();
		});
	});

	test("handles missing device prop", () => {
		const props = {} as any;
		renderWithProviders(<MeuralNextButton {...props} />);

		expect(screen.getByText("Next Image")).toBeInTheDocument();
	});

	test("snackbar can be closed manually", async () => {
		const props = { device: { id: "meural1", name: "Meural", status: "0" } };
		renderWithProviders(<MeuralNextButton {...props} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		await waitFor(() => {
			expect(screen.getByText("Fetching Next Image")).toBeInTheDocument();
		});

		// Find and click the close button
		const closeButton = screen.getByRole("button", { name: /close/i });
		fireEvent.click(closeButton);

		await waitFor(() => {
			expect(screen.queryByText("Fetching Next Image")).not.toBeInTheDocument();
		});
	});
});
