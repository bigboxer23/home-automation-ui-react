import React from "react";
import { screen, fireEvent, waitFor, act } from "@testing-library/react";
import MeuralSourceButton from "../../../components/meural/MeuralSourceButton";
import { renderWithProviders } from "../../../test-utils";
import * as actions from "../../../actions";

// Mock the actions
jest.mock("../../../actions", () => ({
	setMeuralSource: jest.fn(() => (dispatch) => {
		dispatch({ type: "SET_MEURAL_SOURCE" });
	}),
}));

describe("MeuralSourceButton", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	test("renders Source label and all toggle buttons", () => {
		const props = { device: { status: "0" } };
		renderWithProviders(<MeuralSourceButton {...props} />);

		expect(screen.getByText("Source")).toBeInTheDocument();
		expect(screen.getByText("Google Photos")).toBeInTheDocument();
		expect(screen.getByText("OpenAI TextCompletion")).toBeInTheDocument();
		expect(screen.getByText("ChatGPT-3")).toBeInTheDocument();
		expect(screen.getByText("ChatGPT-4")).toBeInTheDocument();
		expect(screen.getByText("James Webb Space Telescope")).toBeInTheDocument();
	});

	test("sets correct value from device status", () => {
		const props = { device: { status: "2" } };
		renderWithProviders(<MeuralSourceButton {...props} />);

		const chatGPT3Button = screen.getByText("ChatGPT-3").closest("button");
		expect(chatGPT3Button).toHaveAttribute("aria-pressed", "true");
	});

	test("handles Google Photos button click", async () => {
		const props = { device: { status: "1" } };
		renderWithProviders(<MeuralSourceButton {...props} />);

		const googlePhotosButton = screen
			.getByText("Google Photos")
			.closest("button");
		fireEvent.click(googlePhotosButton);

		expect(actions.setMeuralSource).toHaveBeenCalledWith("0");

		await waitFor(() => {
			expect(screen.getByText("Changing Source...")).toBeInTheDocument();
		});
	});

	test("handles OpenAI TextCompletion button click", async () => {
		const props = { device: { status: "0" } };
		renderWithProviders(<MeuralSourceButton {...props} />);

		const openAIButton = screen
			.getByText("OpenAI TextCompletion")
			.closest("button");
		fireEvent.click(openAIButton);

		expect(actions.setMeuralSource).toHaveBeenCalledWith("1");

		await waitFor(() => {
			expect(screen.getByText("Changing Source...")).toBeInTheDocument();
		});
	});

	test("handles ChatGPT-3 button click", async () => {
		const props = { device: { status: "0" } };
		renderWithProviders(<MeuralSourceButton {...props} />);

		const chatGPT3Button = screen.getByText("ChatGPT-3").closest("button");
		fireEvent.click(chatGPT3Button);

		expect(actions.setMeuralSource).toHaveBeenCalledWith("2");

		await waitFor(() => {
			expect(screen.getByText("Changing Source...")).toBeInTheDocument();
		});
	});

	test("handles ChatGPT-4 button click", async () => {
		const props = { device: { status: "0" } };
		renderWithProviders(<MeuralSourceButton {...props} />);

		const chatGPT4Button = screen.getByText("ChatGPT-4").closest("button");
		fireEvent.click(chatGPT4Button);

		expect(actions.setMeuralSource).toHaveBeenCalledWith("3");

		await waitFor(() => {
			expect(screen.getByText("Changing Source...")).toBeInTheDocument();
		});
	});

	test("handles James Webb Space Telescope button click", async () => {
		const props = { device: { status: "0" } };
		renderWithProviders(<MeuralSourceButton {...props} />);

		const jamesWebbButton = screen
			.getByText("James Webb Space Telescope")
			.closest("button");
		fireEvent.click(jamesWebbButton);

		expect(actions.setMeuralSource).toHaveBeenCalledWith("4");

		await waitFor(() => {
			expect(screen.getByText("Changing Source...")).toBeInTheDocument();
		});
	});

	test("does not call setMeuralSource when clicking already selected button", () => {
		const props = { device: { status: "1" } };
		renderWithProviders(<MeuralSourceButton {...props} />);

		const openAIButton = screen
			.getByText("OpenAI TextCompletion")
			.closest("button");

		// The button is already selected, clicking should not trigger action
		fireEvent.click(openAIButton);
		expect(actions.setMeuralSource).not.toHaveBeenCalled();
	});

	test("snackbar closes automatically after 3 seconds", async () => {
		const props = { device: { status: "0" } };
		renderWithProviders(<MeuralSourceButton {...props} />);

		const googlePhotosButton = screen
			.getByText("Google Photos")
			.closest("button");
		fireEvent.click(googlePhotosButton);

		await waitFor(() => {
			expect(screen.getByText("Changing Source...")).toBeInTheDocument();
		});

		// Fast-forward time wrapped in act
		act(() => {
			jest.advanceTimersByTime(3000);
		});

		await waitFor(() => {
			expect(screen.queryByText("Changing Source...")).not.toBeInTheDocument();
		});
	});

	test("snackbar can be closed manually", async () => {
		const props = { device: { status: "0" } };
		renderWithProviders(<MeuralSourceButton {...props} />);

		const googlePhotosButton = screen
			.getByText("Google Photos")
			.closest("button");
		fireEvent.click(googlePhotosButton);

		await waitFor(() => {
			expect(screen.getByText("Changing Source...")).toBeInTheDocument();
		});

		// Find and click the close button
		const closeButton = screen.getByRole("button", { name: /close/i });
		fireEvent.click(closeButton);

		await waitFor(() => {
			expect(screen.queryByText("Changing Source...")).not.toBeInTheDocument();
		});
	});

	test("has correct CSS classes", () => {
		const props = { device: { status: "0" } };
		const { container } = renderWithProviders(
			<MeuralSourceButton {...props} />,
		);

		const mainContainer = container.querySelector(".meural-source-button");
		expect(mainContainer).toHaveClass("pt-3", "pb-2");

		const label = container.querySelector(".meural-source-button-label");
		expect(label).toHaveClass("ms-3", "fw-bold", "pt-3", "pb-2");

		const buttons = container.querySelectorAll(".mdi.mdi-check-circle");
		expect(buttons).toHaveLength(5);
	});

	test("handles missing device prop", () => {
		const props = {};
		renderWithProviders(<MeuralSourceButton {...props} />);

		expect(screen.getByText("Source")).toBeInTheDocument();
		expect(screen.getByText("Google Photos")).toBeInTheDocument();

		// Should still allow clicks
		const googlePhotosButton = screen
			.getByText("Google Photos")
			.closest("button");
		fireEvent.click(googlePhotosButton);
		expect(actions.setMeuralSource).toHaveBeenCalledWith("0");
	});

	test("toggle button group has correct aria attributes", () => {
		const props = { device: { status: "1" } };
		renderWithProviders(<MeuralSourceButton {...props} />);

		const toggleGroup = screen.getByRole("group");
		expect(toggleGroup).toHaveAttribute("aria-label", "Source");
	});
});