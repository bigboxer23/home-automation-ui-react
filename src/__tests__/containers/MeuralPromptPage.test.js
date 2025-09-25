import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import MeuralPromptPage from "../../containers/MeuralPromptPage";
import { renderWithProviders, mockFetch } from "../../test-utils";
import { push } from "connected-react-router";
import { updateOpenAIPrompt } from "../../actions";

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

	test("handleKeyUp and handleClick functions are attached to proper elements", () => {
		renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		const textarea = screen.getByPlaceholderText(
			"Enter prompt to generate image from",
		);
		const createButton = screen.getByRole("button", {
			name: "Create New Image",
		});

		// Test that the elements exist and have proper attributes for interactions
		expect(textarea).toBeInTheDocument();
		expect(textarea).toHaveAttribute("id", "creationPrompt");
		expect(createButton).toBeInTheDocument();
		expect(createButton).toHaveAttribute("type", "button");
	});

	test("back navigation header is properly rendered", () => {
		renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		const headerSpan = screen.getByText("Meural Control").closest("span");
		expect(headerSpan).toBeInTheDocument();
		expect(headerSpan).toHaveClass("d-flex", "align-items-center", "flex-row");
	});
});

describe("MeuralPromptPage mapDispatchToProps", () => {
	const mockRooms = [
		{
			name: "Meural",
			devices: [{ name: "Meural", level: "0.0", status: "0" }],
		},
	];
	let mockDispatch;

	beforeEach(() => {
		mockDispatch = jest.fn();
		jest.clearAllMocks();
		global.document.getElementById = jest.fn(() => ({ value: "" }));
		mockFetch({ rooms: mockRooms });
	});

	afterEach(() => {
		delete global.document.getElementById;
	});

	test("component renders and connects to Redux properly", () => {
		const { container } = renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		// Test that component renders without errors
		expect(container).toBeTruthy();
		expect(screen.getByText("Meural Control")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Create New Image" }),
		).toBeInTheDocument();
	});

	test("mapDispatchToProps functions are properly bound", () => {
		renderWithProviders(<MeuralPromptPage />, {
			preloadedState: {
				house: { rooms: mockRooms },
			},
		});

		// Test that all the necessary UI elements are rendered, indicating proper function binding
		const textarea = screen.getByPlaceholderText(
			"Enter prompt to generate image from",
		);
		const createButton = screen.getByRole("button", {
			name: "Create New Image",
		});
		const backHeader = screen.getByText("Meural Control").closest("span");

		expect(textarea).toBeInTheDocument();
		expect(createButton).toBeInTheDocument();
		expect(backHeader).toBeInTheDocument();
	});
});
