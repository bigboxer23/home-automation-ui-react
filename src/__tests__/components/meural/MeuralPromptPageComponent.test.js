import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import MeuralPromptPageComponent from "../../../components/meural/MeuralPromptPageComponent";
import { renderWithProviders } from "../../../test-utils";

describe("MeuralPromptPageComponent", () => {
	const mockProps = {
		back: jest.fn(),
		handleKeyUp: jest.fn(),
		handleClick: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
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
		expect(textarea).toHaveAttribute("type", "text");
		expect(textarea).toHaveClass("pt-4", "w-100", "prompt-textarea");
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

		const mainContainer = container.querySelector(
			".p-2.w-100.h-100.d-flex.flex-wrap.justify-content-center.align-content-start.room-content",
		);
		expect(mainContainer).toBeInTheDocument();

		const flexColumn = container.querySelector(".w-100.d-flex.flex-column");
		expect(flexColumn).toBeInTheDocument();

		const textareaContainer = container.querySelector(
			".ps-3.pe-3.mb-2.MuiToggleButtonGroup-root",
		);
		expect(textareaContainer).toBeInTheDocument();
	});

});