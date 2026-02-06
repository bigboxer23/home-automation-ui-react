import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import SceneHeaderComponent from "../../../components/scene/SceneHeaderComponent";
import { renderWithProviders } from "../../../test-utils";

describe("SceneHeaderComponent", () => {
	const mockProps = {
		back: vi.fn(),
		name: "Test Scene",
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders name prop", () => {
		renderWithProviders(<SceneHeaderComponent {...mockProps} />);

		expect(screen.getByText("Test Scene")).toBeInTheDocument();
	});

	test("renders back chevron icon", () => {
		const { container } = renderWithProviders(
			<SceneHeaderComponent {...mockProps} />,
		);

		const chevronIcon = container.querySelector(".mdi-chevron-left");
		expect(chevronIcon).toBeInTheDocument();
		expect(chevronIcon).toHaveClass("mdi-36px", "z-index-1");
	});

	test("handles back button click", () => {
		renderWithProviders(<SceneHeaderComponent {...mockProps} />);

		const backButton = screen.getByText("Test Scene").closest("span");
		fireEvent.click(backButton);

		expect(mockProps.back).toHaveBeenCalled();
	});

	test("has correct CSS classes", () => {
		const { container } = renderWithProviders(
			<SceneHeaderComponent {...mockProps} />,
		);

		const header = container.querySelector(".header");
		expect(header).toHaveClass("d-flex", "flex-column");

		const innerDiv = container.querySelector(
			".d-flex.align-items-center.w-100.flex-row",
		);
		expect(innerDiv).toBeInTheDocument();

		const clickableSpan = container.querySelector(
			".d-flex.align-items-center.flex-row",
		);
		expect(clickableSpan).toBeInTheDocument();
	});
});
