import React from "react";
import { screen } from "@testing-library/react";
import CameraComponent from "../../components/CameraComponent";
import { renderWithProviders } from "../../test-utils";

describe("CameraComponent", () => {
	const mockProps = {
		back: jest.fn(),
		load: jest.fn(),
		getSource: () => "/test-source",
		getName: () => "Test Camera",
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders iframe with correct source", () => {
		const { container } = renderWithProviders(
			<CameraComponent {...mockProps} />,
		);

		const iframe = container.querySelector("iframe");
		expect(iframe).toHaveAttribute("src", "/test-source");
		expect(iframe).toHaveClass("security", "room-content");
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
