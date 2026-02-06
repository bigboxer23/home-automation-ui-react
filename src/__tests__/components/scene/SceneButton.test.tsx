import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import SceneButton from "../../../components/scene/SceneButton";
import { renderWithProviders } from "../../../test-utils";

describe("SceneButton", () => {
	const mockRoom = {
		id: "room1",
		name: "Living Room",
	};

	const mockProps = {
		room: mockRoom,
		handleClick: vi.fn(),
	} as any;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders room name on both buttons", () => {
		renderWithProviders(<SceneButton {...mockProps} />);

		expect(screen.getByText("Living Room On")).toBeInTheDocument();
		expect(screen.getByText("Living Room Off")).toBeInTheDocument();
	});

	test("displays correct icons", () => {
		const { container } = renderWithProviders(<SceneButton {...mockProps} />);

		const onIcon = container.querySelector(".mdi-lightbulb-group-outline");
		const offIcon = container.querySelector(".mdi-lightbulb-group-off-outline");

		expect(onIcon).toBeInTheDocument();
		expect(offIcon).toBeInTheDocument();
	});

	test("calls handleClick with correct parameters for ON button", () => {
		renderWithProviders(<SceneButton {...mockProps} />);

		const onButton = screen.getByText("Living Room On").closest("button")!;
		fireEvent.click(onButton);

		expect(mockProps.handleClick).toHaveBeenCalledWith("room1", "ON");
	});

	test("calls handleClick with correct parameters for OFF button", () => {
		renderWithProviders(<SceneButton {...mockProps} />);

		const offButton = screen.getByText("Living Room Off").closest("button")!;
		fireEvent.click(offButton);

		expect(mockProps.handleClick).toHaveBeenCalledWith("room1", "OFF");
	});

	test("has correct CSS classes", () => {
		renderWithProviders(<SceneButton {...mockProps} />);

		const onButton = screen.getByText("Living Room On").closest("button");
		const offButton = screen.getByText("Living Room Off").closest("button");

		expect(onButton).toHaveClass(
			"mb-3",
			"m-1",
			"position-relative",
			"d-flex",
			"justify-content-center",
		);
		expect(offButton).toHaveClass(
			"m-1",
			"position-relative",
			"d-flex",
			"justify-content-center",
		);
	});
});
