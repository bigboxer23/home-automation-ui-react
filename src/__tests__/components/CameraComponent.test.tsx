import React from "react";
import { screen } from "@testing-library/react";
import CameraComponent from "../../components/CameraComponent";
import { renderWithProviders } from "../../test-utils";

describe("CameraComponent", () => {
	const mockProps = {
		back: vi.fn(),
		load: vi.fn(),
		getSource: () => "/test-source",
		getName: () => "Test Camera",
		isStream: () => false,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders iframe with correct source", () => {
		const { container } = renderWithProviders(
			<CameraComponent {...mockProps} />,
		);

		const iframe = container.querySelector("iframe");
		expect(iframe).toHaveAttribute("src", "/test-source");
		expect(iframe).toHaveClass(
			"w-full",
			"h-[960px]",
			"border-0",
			"room-content",
		);
	});

	test("renders a stream as an img instead of an iframe", () => {
		const { container } = renderWithProviders(
			<CameraComponent {...mockProps} isStream={() => true} />,
		);

		const img = container.querySelector("img");
		expect(img).toHaveAttribute("src", "/test-source");
		expect(img).toHaveAttribute("alt", "Test Camera");
		expect(img).toHaveClass("block", "w-full", "h-auto");
		expect(container.querySelector("iframe")).not.toBeInTheDocument();
		expect(mockProps.load).not.toHaveBeenCalled();
	});

	test("renders header with correct name", () => {
		renderWithProviders(<CameraComponent {...mockProps} />);

		expect(screen.getByText("Test Camera")).toBeInTheDocument();
	});

	test("calls load function with iframe ref", () => {
		renderWithProviders(<CameraComponent {...mockProps} />);

		expect(mockProps.load).toHaveBeenCalled();
	});

	test("renders background div", () => {
		const { container } = renderWithProviders(
			<CameraComponent {...mockProps} />,
		);

		expect(container.querySelector(".background")).toBeInTheDocument();
	});
});
