import React from "react";
import { render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import NavigationProvider from "../../components/NavigationProvider";
import {
	setNavigationInstance,
	getNavigationInstance,
} from "../../utils/navigation";

// Mock react-router-dom
vi.mock("react-router-dom", () => ({
	useNavigate: vi.fn(),
}));

// Mock navigation utility
vi.mock("../../utils/navigation", () => ({
	setNavigationInstance: vi.fn(),
	getNavigationInstance: vi.fn(),
}));

describe("NavigationProvider", () => {
	const mockNavigate = vi.fn();
	const mockChildren = <div data-testid="test-child">Test Content</div>;

	beforeEach(() => {
		vi.clearAllMocks();
		useNavigate.mockReturnValue(mockNavigate);
	});

	test("renders children without modification", () => {
		const { getByTestId } = render(
			<NavigationProvider>{mockChildren}</NavigationProvider>,
		);

		expect(getByTestId("test-child")).toBeInTheDocument();
		expect(getByTestId("test-child")).toHaveTextContent("Test Content");
	});

	test("calls useNavigate hook", () => {
		render(<NavigationProvider>{mockChildren}</NavigationProvider>);

		expect(useNavigate).toHaveBeenCalledTimes(1);
	});

	test("sets navigation instance with navigate function", () => {
		render(<NavigationProvider>{mockChildren}</NavigationProvider>);

		expect(setNavigationInstance).toHaveBeenCalledWith(mockNavigate);
	});

	test("updates navigation instance when navigate changes", () => {
		const newMockNavigate = vi.fn();

		const { rerender } = render(
			<NavigationProvider>{mockChildren}</NavigationProvider>,
		);

		// Change the mock return value
		useNavigate.mockReturnValue(newMockNavigate);

		rerender(<NavigationProvider>{mockChildren}</NavigationProvider>);

		// Should be called twice - once for initial render, once for rerender
		expect(setNavigationInstance).toHaveBeenCalledTimes(2);
		expect(setNavigationInstance).toHaveBeenLastCalledWith(newMockNavigate);
	});

	test("handles multiple children", () => {
		const multipleChildren = (
			<>
				<div data-testid="child-1">Child 1</div>
				<div data-testid="child-2">Child 2</div>
			</>
		);

		const { getByTestId } = render(
			<NavigationProvider>{multipleChildren}</NavigationProvider>,
		);

		expect(getByTestId("child-1")).toBeInTheDocument();
		expect(getByTestId("child-2")).toBeInTheDocument();
	});
});
