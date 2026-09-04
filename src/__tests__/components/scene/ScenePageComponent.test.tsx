import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import ScenePageComponent from "../../../components/scene/ScenePageComponent";
import { renderWithProviders } from "../../../test-utils";

describe("ScenePageComponent", () => {
	const mockRooms = [
		{ id: "room1", name: "Living Room" },
		{ id: "room2", name: "Kitchen" },
	];

	const mockProps = {
		back: vi.fn(),
		rooms: mockRooms,
		handleClick: vi.fn(),
		gotoPage: vi.fn(),
	} as any;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders header with correct name", () => {
		renderWithProviders(<ScenePageComponent {...mockProps} />);

		expect(screen.getByText("Scenes")).toBeInTheDocument();
	});

	test("renders SceneButton for each room", () => {
		renderWithProviders(<ScenePageComponent {...mockProps} />);

		expect(screen.getByText("Living Room On")).toBeInTheDocument();
		expect(screen.getByText("Living Room Off")).toBeInTheDocument();
		expect(screen.getByText("Kitchen On")).toBeInTheDocument();
		expect(screen.getByText("Kitchen Off")).toBeInTheDocument();
	});

	test("renders Security and GrowTent buttons", () => {
		renderWithProviders(<ScenePageComponent {...mockProps} />);

		expect(screen.getByText("Front Door Security")).toBeInTheDocument();
		expect(screen.getByText("Grow Tent")).toBeInTheDocument();
	});

	test("handles Security button click", () => {
		renderWithProviders(<ScenePageComponent {...mockProps} />);

		const securityButton = screen
			.getByText("Front Door Security")
			.closest("button")!;
		fireEvent.click(securityButton);

		expect(mockProps.gotoPage).toHaveBeenCalledWith("Security");
	});

	test("handles Grow Tent button click", () => {
		renderWithProviders(<ScenePageComponent {...mockProps} />);

		const growButton = screen.getByText("Grow Tent").closest("button")!;
		fireEvent.click(growButton);

		expect(mockProps.gotoPage).toHaveBeenCalledWith("Grow");
	});

	test("passes handleClick to SceneButton components", () => {
		renderWithProviders(<ScenePageComponent {...mockProps} />);

		const livingRoomOnButton = screen
			.getByText("Living Room On")
			.closest("button")!;
		fireEvent.click(livingRoomOnButton);

		expect(mockProps.handleClick).toHaveBeenCalledWith("room1", "ON");
	});

	test("renders background div", () => {
		const { container } = renderWithProviders(
			<ScenePageComponent {...mockProps} />,
		);

		expect(container.querySelector(".background")).toBeInTheDocument();
	});

	test("has correct CSS classes for main container", () => {
		const { container } = renderWithProviders(
			<ScenePageComponent {...mockProps} />,
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
	});

	test("displays correct icons for camera buttons", () => {
		const { container } = renderWithProviders(
			<ScenePageComponent {...mockProps} />,
		);

		const videoIcons = container.querySelectorAll(
			".mdi-video-wireless-outline",
		);
		expect(videoIcons).toHaveLength(2);
	});
});
