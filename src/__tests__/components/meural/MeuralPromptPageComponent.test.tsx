import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import MeuralPromptPageComponent from "../../../components/meural/MeuralPromptPageComponent";
import { renderWithProviders } from "../../../test-utils";

describe("MeuralPromptPageComponent", () => {
	const mockProps = {
		back: vi.fn(),
		handleKeyUp: vi.fn(),
		handleClick: vi.fn(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders header with correct title", () => {
		renderWithProviders(<MeuralPromptPageComponent {...mockProps} />);

		expect(screen.getByText("Meural Control")).toBeInTheDocument();
	});

	test("renders textarea with correct attributes", () => {
		renderWithProviders(<MeuralPromptPageComponent {...mockProps} />);

		const textarea = screen.getByPlaceholderText(
			"Enter prompt to generate image from",
		);
		expect(textarea).toBeInTheDocument();
		expect(textarea).toHaveAttribute("id", "creationPrompt");
		expect(textarea).toHaveClass(
			"pt-6",
			"w-full",
			"border-none",
			"resize-none",
		);
	});

	test("renders Create New Image button", () => {
		renderWithProviders(<MeuralPromptPageComponent {...mockProps} />);

		const button = screen.getByRole("button", { name: "Create New Image" });
		expect(button).toBeInTheDocument();
	});

	test("calls handleKeyUp when typing in textarea", () => {
		renderWithProviders(<MeuralPromptPageComponent {...mockProps} />);

		const textarea = screen.getByPlaceholderText(
			"Enter prompt to generate image from",
		);
		fireEvent.keyUp(textarea, { key: "a", code: "KeyA" });

		expect(mockProps.handleKeyUp).toHaveBeenCalled();
	});

	test("calls handleClick when Create New Image button is clicked", () => {
		renderWithProviders(<MeuralPromptPageComponent {...mockProps} />);

		const button = screen.getByRole("button", { name: "Create New Image" });
		fireEvent.click(button);

		expect(mockProps.handleClick).toHaveBeenCalled();
	});

	test("renders background div", () => {
		const { container } = renderWithProviders(
			<MeuralPromptPageComponent {...mockProps} />,
		);

		expect(container.querySelector(".background")).toBeInTheDocument();
	});

	test("has correct CSS classes", () => {
		const { container } = renderWithProviders(
			<MeuralPromptPageComponent {...mockProps} />,
		);

		const mainContainer = container.querySelector(".room-content");
		expect(mainContainer).toHaveClass(
			"px-2",
			"pb-2",
			"w-full",
			"h-full",
			"flex",
			"flex-wrap",
			"justify-center",
			"content-start",
		);

		const flexColumn = mainContainer?.firstElementChild;
		expect(flexColumn).toHaveClass("w-full", "flex", "flex-col");

		const textareaContainer = container.querySelector(
			".MuiToggleButtonGroup-root",
		);
		expect(textareaContainer).toHaveClass("ps-4", "pe-4", "mb-2");
	});
});
