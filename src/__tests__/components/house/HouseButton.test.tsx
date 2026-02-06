import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders, mockRoomData } from "../../../test-utils";
import HouseButton from "../../../components/house/HouseButton";

// Mock the connected-react-router push action
vi.mock("../../../utils/navigation", async () => ({
	...(await vi.importActual("../../../utils/navigation")),
	push: vi.fn(),
}));

describe("HouseButton", () => {
	const mockRoom = mockRoomData.rooms[0];
	const mockTime = {
		id: "time",
		name: "Time",
		devices: [
			{ id: "IsMorning", name: "IsMorning", status: "0" },
			{ id: "IsDay", name: "IsDay", status: "1" },
			{ id: "IsEvening", name: "IsEvening", status: "0" },
			{ id: "IsNight", name: "IsNight", status: "0" },
		],
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders house button with room name", () => {
		renderWithProviders(<HouseButton room={mockRoom} time={mockTime} />);

		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("displays total lights count", () => {
		renderWithProviders(<HouseButton room={mockRoom} time={mockTime} />);

		expect(screen.getByText("1")).toBeInTheDocument();
	});

	test("shows Evening On scene during day", () => {
		renderWithProviders(<HouseButton room={mockRoom} time={mockTime} />);

		expect(screen.getByText("Evening On")).toBeInTheDocument();
	});

	test("shows PTO Mode when PTO scene is active", () => {
		const roomWithPTO = {
			...mockRoom,
			devices: [...mockRoom.devices, { id: "pto", name: "Is PTO", level: "1" }],
		};

		renderWithProviders(<HouseButton room={roomWithPTO} time={mockTime} />);

		expect(screen.getByText("PTO Mode")).toBeInTheDocument();
	});

	test("shows Vacation Mode when vacation scene is active", () => {
		const roomWithVacation = {
			...mockRoom,
			devices: [
				...mockRoom.devices,
				{ id: "vacation", name: "Vacation Mode", level: "1" },
			],
		};

		renderWithProviders(
			<HouseButton room={roomWithVacation} time={mockTime} />,
		);

		expect(screen.getByText("Vacation Mode")).toBeInTheDocument();
	});

	test("applies correct CSS classes", () => {
		renderWithProviders(<HouseButton room={mockRoom} time={mockTime} />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("house-button");
		expect(button).toHaveClass("m-1");
		expect(button).toHaveClass("position-relative");
	});
});
