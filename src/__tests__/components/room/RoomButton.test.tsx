import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils";
import RoomButton from "../../../components/room/RoomButton";

describe("RoomButton", () => {
	const mockHandleClick = vi.fn();
	const mockHandleMoreClick = vi.fn();

	const mockRoomWithLights = {
		id: "room1",
		name: "Living Room",
		devices: [
			{
				name: "Light 1",
				status: "1",
				level: "50",
				category: "2", // Light category
			},
			{
				name: "Light 2",
				status: "0",
				level: "0",
				category: "2",
			},
			{
				name: "Room Temperature",
				status: "1",
				level: "72",
				category: "17", // Temperature sensor
			},
		],
	};

	const mockRoomWithoutLights = {
		id: "room2",
		name: "Bedroom",
		devices: [
			{
				name: "Light 1",
				status: "0",
				level: "0",
				category: "2",
			},
			{
				name: "Room Temperature",
				status: "1",
				level: "68",
				category: "17",
			},
		],
	};

	const mockRoomWithLowBattery = {
		id: "room3",
		name: "Kitchen",
		devices: [
			{
				name: "Motion Sensor Battery",
				status: "1",
				level: "30", // Low battery
				category: "16",
			},
			{
				name: "Light 1",
				status: "1",
				level: "75",
				category: "2",
			},
		],
	};

	const mockRoomWithOverride = {
		id: "room4",
		name: "Office",
		devices: [
			{
				name: "Light Override",
				status: "1",
				level: "100",
				category: "2",
			},
			{
				name: "Light 1",
				status: "1",
				level: "50",
				category: "2",
			},
		],
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders room button with room name", () => {
		renderWithProviders(
			<RoomButton
				room={mockRoomWithLights}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		expect(screen.getByText("Living Room")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("displays lightbulb icon", () => {
		renderWithProviders(
			<RoomButton
				room={mockRoomWithLights}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		const lightbulbIcon = document.querySelector(".mdi-lightbulb-outline");
		expect(lightbulbIcon).toBeInTheDocument();
	});

	test("displays light count when lights are on", () => {
		renderWithProviders(
			<RoomButton
				room={mockRoomWithLights}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		expect(screen.getByText("1")).toBeInTheDocument(); // One light is on
	});

	test("displays temperature when no lights are on", () => {
		renderWithProviders(
			<RoomButton
				room={mockRoomWithoutLights}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		expect(screen.getByText("68°")).toBeInTheDocument();
	});

	test("applies success variant when lights are on", () => {
		renderWithProviders(
			<RoomButton
				room={mockRoomWithLights}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("btn-success");
	});

	test("applies default variant when lights are off", () => {
		renderWithProviders(
			<RoomButton
				room={mockRoomWithoutLights}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("btn-default");
	});

	test("shows battery warning style for low battery", () => {
		renderWithProviders(
			<RoomButton
				room={mockRoomWithLowBattery}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		const lightbulbIcon = document.querySelector(".mdi-lightbulb-outline");
		expect(lightbulbIcon).toHaveClass("danger");
	});

	test("shows lock icon when override is active", () => {
		renderWithProviders(
			<RoomButton
				room={mockRoomWithOverride}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		const lockIcon = document.querySelector(".mdi-lock-outline");
		expect(lockIcon).toBeInTheDocument();
	});

	test("hides dots when count content is displayed", () => {
		renderWithProviders(
			<RoomButton
				room={mockRoomWithLights}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		const dotsIcon = document.querySelector(".mdi-dots-horizontal");
		expect(dotsIcon).toHaveClass("hide");
	});

	test("shows dots when no count content", () => {
		const roomWithNoTemp = {
			id: "room5",
			name: "Garage",
			devices: [
				{
					name: "Light 1",
					status: "0",
					level: "0",
					category: "2",
				},
			],
		};

		renderWithProviders(
			<RoomButton
				room={roomWithNoTemp}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		const dotsIcon = document.querySelector(".mdi-dots-horizontal");
		expect(dotsIcon).not.toHaveClass("hide");
	});

	test("calls handleMoreClick when button is clicked", () => {
		renderWithProviders(
			<RoomButton
				room={mockRoomWithLights}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(mockHandleMoreClick).toHaveBeenCalledWith(
			expect.any(Object),
			"Living Room",
		);
	});

	test("calls handleClick when room name is clicked", () => {
		renderWithProviders(
			<RoomButton
				room={mockRoomWithLights}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		const roomNameDiv = screen.getByText("Living Room");
		fireEvent.click(roomNameDiv);

		expect(mockHandleClick).toHaveBeenCalledWith(
			expect.any(Object),
			"room1",
			0, // Room is on, so should turn off (0)
		);
	});

	test("calls handleClick with 100 when room is off", () => {
		renderWithProviders(
			<RoomButton
				room={mockRoomWithoutLights}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		const roomNameDiv = screen.getByText("Bedroom");
		fireEvent.click(roomNameDiv);

		expect(mockHandleClick).toHaveBeenCalledWith(
			expect.any(Object),
			"room2",
			100, // Room is off, so should turn on (100)
		);
	});

	test("applies correct CSS classes", () => {
		renderWithProviders(
			<RoomButton
				room={mockRoomWithLights}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("m-1");
		expect(button).toHaveClass("position-relative");
		expect(button).toHaveClass("d-flex");
		expect(button).toHaveClass("justify-content-center");
	});

	test("handles room with no devices", () => {
		const emptyRoom = {
			id: "empty",
			name: "Empty Room",
			devices: [],
		};

		renderWithProviders(
			<RoomButton
				room={emptyRoom}
				handleClick={mockHandleClick}
				handleMoreClick={mockHandleMoreClick}
			/>,
		);

		expect(screen.getByText("Empty Room")).toBeInTheDocument();
		const button = screen.getByRole("button");
		expect(button).toHaveClass("btn-default");
	});
});
