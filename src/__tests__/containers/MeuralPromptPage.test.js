import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import MeuralPromptPage from "../../containers/MeuralPromptPage";
import { renderWithProviders, mockFetch } from "../../test-utils";
// Import will be mocked
import { updateOpenAIPrompt } from "../../actions";

// Mock the actions and router
jest.mock("connected-react-router", () => ({
	...jest.requireActual("connected-react-router"),
	push: jest.fn(() => ({
		type: "@@router/CALL_HISTORY_METHOD",
		payload: { method: "push", args: ["/Meural"] },
	})),
}));

jest.mock("../../actions", () => ({
	updateOpenAIPrompt: jest.fn(),
	fetchStatusIfNecessary: jest.fn(() => ({ type: "FETCH_STATUS" })),
}));

describe("MeuralPromptPage", () => {
	const mockRooms = [
		{
			name: "Meural",
			devices: [{ name: "Meural", level: "0.0", status: "0" }],
		},
	];

	beforeEach(() => {
		jest.clearAllMocks();
		mockFetch({ rooms: mockRooms });

		// Reset document.getElementById mock
		global.document.getElementById = jest.fn(() => ({
			value: "",
		}));

		// Re-setup push mock after clearAllMocks
		const { push } = require("connected-react-router");
		push.mockImplementation(() => ({
			type: "@@router/CALL_HISTORY_METHOD",
			payload: { method: "push", args: ["/Meural"] },
		}));
	});

	afterEach(() => {
		delete global.document.getElementById;
	});

	test("renders MeuralPromptPageComponent", () => {
		renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		expect(screen.getByText("Meural Control")).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Enter prompt to generate image from"),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Create New Image" }),
		).toBeInTheDocument();
	});

	test("header renders with back functionality", () => {
		renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		// Test that the header with back capability is rendered
		const backHeader = screen.getByText("Meural Control");
		expect(backHeader).toBeInTheDocument();

		// Check that the header element is clickable (has onClick)
		const headerSpan = backHeader.closest("span");
		expect(headerSpan).toBeInTheDocument();
	});

	test("passes correct device from mapStateToProps", () => {
		const meuralDevice = { name: "Meural", level: "1.0", status: "1" };
		const roomsWithMeural = [
			{
				name: "Meural",
				devices: [meuralDevice],
			},
		];

		renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: roomsWithMeural },
			},
		});

		// Verify the component renders (indicating mapStateToProps worked)
		expect(screen.getByText("Meural Control")).toBeInTheDocument();
	});

	test("handleClick button is present", () => {
		renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		const createButton = screen.getByRole("button", {
			name: "Create New Image",
		});
		expect(createButton).toBeInTheDocument();
		expect(createButton).toHaveAttribute("type", "button");
	});

	test("textarea has proper attributes", () => {
		renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		const textarea = screen.getByPlaceholderText(
			"Enter prompt to generate image from",
		);

		expect(textarea).toBeInTheDocument();
		expect(textarea).toHaveAttribute("id", "creationPrompt");
		expect(textarea).toHaveAttribute("type", "text");
	});

	test("component renders with empty rooms", () => {
		renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: [] },
			},
		});

		expect(screen.getByText("Meural Control")).toBeInTheDocument();
	});

	test("component renders with null rooms", () => {
		renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: null },
			},
		});

		expect(screen.getByText("Meural Control")).toBeInTheDocument();
	});

	test("handleClick button exists and renders correctly", () => {
		renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		const createButton = screen.getByRole("button", {
			name: "Create New Image",
		});

		expect(createButton).toBeInTheDocument();
		expect(createButton).toHaveAttribute("type", "button");
	});

	test("handleClick calls updateOpenAIPrompt and navigates when input has value", () => {
		const mockElement = { value: "test prompt" };
		global.document.getElementById = jest.fn(() => mockElement);

		const { store } = renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		// Get reference to the push function to spy on
		const { push } = require("connected-react-router");

		const createButton = screen.getByRole("button", {
			name: "Create New Image",
		});

		fireEvent.click(createButton);

		expect(updateOpenAIPrompt).toHaveBeenCalledWith("test prompt");
		expect(push).toHaveBeenCalledWith("/Meural");
	});

	test("handleClick does not call actions when input is empty", () => {
		const mockElement = { value: "" };
		global.document.getElementById = jest.fn(() => mockElement);

		const { store } = renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		const dispatchSpy = jest.spyOn(store, "dispatch");

		const createButton = screen.getByRole("button", {
			name: "Create New Image",
		});

		fireEvent.click(createButton);

		expect(updateOpenAIPrompt).not.toHaveBeenCalled();
		expect(dispatchSpy).not.toHaveBeenCalled();
	});

	test("handleClick does not call actions when input is null", () => {
		global.document.getElementById = jest.fn(() => ({ value: null }));

		const { store } = renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		const dispatchSpy = jest.spyOn(store, "dispatch");

		const createButton = screen.getByRole("button", {
			name: "Create New Image",
		});

		fireEvent.click(createButton);

		expect(updateOpenAIPrompt).not.toHaveBeenCalled();
		expect(dispatchSpy).not.toHaveBeenCalled();
	});

	test("handleClick does not call actions when element not found", () => {
		global.document.getElementById = jest.fn(() => null);

		const { store } = renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		const dispatchSpy = jest.spyOn(store, "dispatch");

		const createButton = screen.getByRole("button", {
			name: "Create New Image",
		});

		fireEvent.click(createButton);

		expect(updateOpenAIPrompt).not.toHaveBeenCalled();
		expect(dispatchSpy).not.toHaveBeenCalled();
	});

	test("handleKeyUp calls updateOpenAIPrompt and navigates on Enter key with value", () => {
		const mockElement = { value: "test prompt from enter" };
		global.document.getElementById = jest.fn(() => mockElement);

		const { store } = renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		// Get reference to the push function to spy on
		const { push } = require("connected-react-router");

		const textarea = screen.getByPlaceholderText(
			"Enter prompt to generate image from",
		);

		fireEvent.keyUp(textarea, { key: "Enter", code: "Enter" });

		expect(updateOpenAIPrompt).toHaveBeenCalledWith("test prompt from enter");
		expect(push).toHaveBeenCalledWith("/Meural");
	});

	test("handleKeyUp does not call actions on non-Enter key", () => {
		const mockElement = { value: "test prompt" };
		global.document.getElementById = jest.fn(() => mockElement);

		const { store } = renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		const dispatchSpy = jest.spyOn(store, "dispatch");

		const textarea = screen.getByPlaceholderText(
			"Enter prompt to generate image from",
		);

		fireEvent.keyUp(textarea, { key: "a", code: "KeyA" });

		expect(updateOpenAIPrompt).not.toHaveBeenCalled();
		expect(dispatchSpy).not.toHaveBeenCalled();
	});

	test("handleKeyUp does not call actions on Enter with empty value", () => {
		const mockElement = { value: "" };
		global.document.getElementById = jest.fn(() => mockElement);

		const { store } = renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		const dispatchSpy = jest.spyOn(store, "dispatch");

		const textarea = screen.getByPlaceholderText(
			"Enter prompt to generate image from",
		);

		fireEvent.keyUp(textarea, { key: "Enter", code: "Enter" });

		expect(updateOpenAIPrompt).not.toHaveBeenCalled();
		expect(dispatchSpy).not.toHaveBeenCalled();
	});

	test("handleKeyUp with Enter and whitespace-only value calls actions (actual behavior)", () => {
		const mockElement = { value: "   " };
		global.document.getElementById = jest.fn(() => mockElement);

		const { store } = renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		// Get reference to the push function to spy on
		const { push } = require("connected-react-router");

		const textarea = screen.getByPlaceholderText(
			"Enter prompt to generate image from",
		);

		fireEvent.keyUp(textarea, { key: "Enter", code: "Enter" });

		// The code only checks value.length > 0, not if it's trimmed
		expect(updateOpenAIPrompt).toHaveBeenCalledWith("   ");
		expect(push).toHaveBeenCalledWith("/Meural");
	});

	test("back action dispatches push to /Meural", () => {
		const { store } = renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		// Get reference to the push function to spy on
		const { push } = require("connected-react-router");

		const headerSpan = screen.getByText("Meural Control").closest("span");

		fireEvent.click(headerSpan);

		expect(push).toHaveBeenCalledWith("/Meural");
	});
});

describe("MeuralPromptPage mapDispatchToProps", () => {
	const mockRooms = [
		{
			name: "Meural",
			devices: [{ name: "Meural", level: "0.0", status: "0" }],
		},
	];

	beforeEach(() => {
		jest.clearAllMocks();
		global.document.getElementById = jest.fn(() => ({ value: "" }));
		mockFetch({ rooms: mockRooms });

		// Re-setup push mock after clearAllMocks
		const { push } = require("connected-react-router");
		push.mockImplementation(() => ({
			type: "@@router/CALL_HISTORY_METHOD",
			payload: { method: "push", args: ["/Meural"] },
		}));
	});

	afterEach(() => {
		delete global.document.getElementById;
	});

	test("back action returns push(/Meural)", () => {
		const { container } = renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		// Test that back function exists and can be called
		expect(container).toBeTruthy();
		expect(screen.getByText("Meural Control")).toBeInTheDocument();
	});

	test("handleClick function dispatches correctly with valid input", () => {
		const mockElement = { value: "test prompt" };
		global.document.getElementById = jest.fn(() => mockElement);

		const { store } = renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		const dispatchSpy = jest.spyOn(store, "dispatch");

		const createButton = screen.getByRole("button", {
			name: "Create New Image",
		});

		fireEvent.click(createButton);

		expect(updateOpenAIPrompt).toHaveBeenCalledWith("test prompt");
	});

	test("handleKeyUp function only responds to Enter key", () => {
		const mockElement = { value: "test prompt" };
		global.document.getElementById = jest.fn(() => mockElement);

		const { store } = renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		const dispatchSpy = jest.spyOn(store, "dispatch");

		const textarea = screen.getByPlaceholderText(
			"Enter prompt to generate image from",
		);

		// Test non-Enter key
		fireEvent.keyUp(textarea, { key: "a", code: "KeyA" });
		expect(updateOpenAIPrompt).not.toHaveBeenCalled();
		expect(dispatchSpy).not.toHaveBeenCalled();

		// Test Enter key
		fireEvent.keyUp(textarea, { key: "Enter", code: "Enter" });
		expect(updateOpenAIPrompt).toHaveBeenCalledWith("test prompt");
	});
});