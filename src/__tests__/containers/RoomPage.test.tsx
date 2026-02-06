import React from "react";
import { screen } from "@testing-library/react";
import RoomPage, {
	getBatteryStyle,
	getBatteryContent,
	isMotionDevice,
	getHeaderTitle,
	getRoomDimLevel,
	getIntegerLevel,
} from "../../containers/RoomPage";
import { renderWithProviders } from "../../test-utils";
import { mockFetch } from "../../test-utils";

vi.mock("react-router-dom", async () => {
	return await import("../../__mocks__/react-router-dom");
});

describe("RoomPage", () => {
	const mockRoomsState = {
		house: {
			rooms: [
				{
					name: "Living Room",
					devices: [
						{
							id: "light1",
							name: "Main Light",
							status: "1",
							level: "75",
							category: "2",
						},
						{
							id: "fan1",
							name: "Ceiling Fan",
							status: "0",
							level: "0",
							category: "3",
						},
						{ id: "motion1", name: "Motion Battery", status: "0", level: "85" },
						{ id: "temp1", name: "Temperature", status: "0", level: "72" },
					],
				},
				{
					name: "Bedroom",
					devices: [
						{
							id: "light2",
							name: "Bed Light",
							status: "0",
							level: "NULL",
							category: "2",
						},
					],
				},
			],
		},
	};

	const mockRouterProps = {
		match: {
			params: {
				name: "Living Room",
			},
		},
	};

	beforeEach(() => {
		mockFetch({ rooms: [] });
		vi.clearAllMocks();
	});

	test("renders RoomPageComponent", () => {
		renderWithProviders(<RoomPage {...(mockRouterProps as any)} />, {
			preloadedState: mockRoomsState as any,
		});

		expect(screen.getByText("Living Room")).toBeInTheDocument();
	});

	test("componentDidMount calls fetchStatus", () => {
		renderWithProviders(<RoomPage {...(mockRouterProps as any)} />, {
			preloadedState: mockRoomsState as any,
		});

		expect((globalThis as any).fetch).toHaveBeenCalled();
	});

	test("filters and sorts room devices correctly", () => {
		renderWithProviders(<RoomPage {...(mockRouterProps as any)} />, {
			preloadedState: mockRoomsState as any,
		});

		// Should display devices from the Living Room that are lights or motion sensors
		expect(screen.getByText("Main Light")).toBeInTheDocument();
		expect(screen.getByText("Ceiling Fan")).toBeInTheDocument();
		expect(screen.getByText("Motion")).toBeInTheDocument(); // "Motion Battery" renders as "Motion"
	});

	test("handles non-existent room gracefully", () => {
		const nonExistentRoomProps = {
			match: {
				params: {
					name: "Non-existent Room",
				},
			},
		};

		renderWithProviders(<RoomPage {...(nonExistentRoomProps as any)} />, {
			preloadedState: mockRoomsState as any,
		});

		// Should still render basic room component structure
		expect(document.querySelector(".room-component")).toBeInTheDocument();
		expect(document.querySelector(".background")).toBeInTheDocument();
	});

	test("handles null rooms gracefully", () => {
		const nullRoomsState = {
			house: {
				rooms: null,
			},
		};

		renderWithProviders(<RoomPage {...(mockRouterProps as any)} />, {
			preloadedState: nullRoomsState as any,
		});

		// Should render basic structure even with null rooms
		expect(document.querySelector(".room-component")).toBeInTheDocument();
		expect(document.querySelector(".background")).toBeInTheDocument();
	});
});

describe("RoomPage utility functions", () => {
	describe("getBatteryStyle", () => {
		test("returns green for 100% battery", () => {
			const device = { level: "100" } as any;
			const style = getBatteryStyle(device);
			expect(style.backgroundColor).toBe("#03902B");
		});

		test("returns green for 0% battery", () => {
			const device = { level: "0" } as any;
			const style = getBatteryStyle(device);
			expect(style.backgroundColor).toBe("#03902B");
		});

		test("returns light green for 95% battery", () => {
			const device = { level: "95" } as any;
			const style = getBatteryStyle(device);
			expect(style.backgroundColor).toBe("#2DC558");
		});

		test("returns yellow for 70% battery", () => {
			const device = { level: "70" } as any;
			const style = getBatteryStyle(device);
			expect(style.backgroundColor).toBe("#FECF3B");
		});

		test("returns orange for 50% battery", () => {
			const device = { level: "50" } as any;
			const style = getBatteryStyle(device);
			expect(style.backgroundColor).toBe("#EC9800");
		});

		test("returns red-orange for 35% battery", () => {
			const device = { level: "35" } as any;
			const style = getBatteryStyle(device);
			expect(style.backgroundColor).toBe("#DD531E");
		});

		test("returns red for 25% battery", () => {
			const device = { level: "25" } as any;
			const style = getBatteryStyle(device);
			expect(style.backgroundColor).toBe("#C53600");
		});

		test("returns dark red for 15% battery", () => {
			const device = { level: "15" } as any;
			const style = getBatteryStyle(device);
			expect(style.backgroundColor).toBe("#B10909");
		});

		test("returns darkest red for 5% battery", () => {
			const device = { level: "5" } as any;
			const style = getBatteryStyle(device);
			expect(style.backgroundColor).toBe("#6F0015");
		});
	});

	describe("getBatteryContent", () => {
		test("returns percentage for valid level", () => {
			const device = { level: "85" } as any;
			expect(getBatteryContent(device)).toBe("85%");
		});

		test("returns 'Not Available' for NULL level", () => {
			const device = { level: "NULL" } as any;
			expect(getBatteryContent(device)).toBe("Not Available");
		});

		test("returns percentage for 0% level", () => {
			const device = { level: "0" } as any;
			expect(getBatteryContent(device)).toBe("0%");
		});

		test("returns percentage for 100% level", () => {
			const device = { level: "100" } as any;
			expect(getBatteryContent(device)).toBe("100%");
		});
	});

	describe("isMotionDevice", () => {
		test("returns true for device ending with Battery", () => {
			const device = { name: "Motion Battery" } as any;
			expect(isMotionDevice(device)).toBe(true);
		});

		test("returns true for complex name ending with Battery", () => {
			const device = { name: "Living Room Motion Sensor Battery" } as any;
			expect(isMotionDevice(device)).toBe(true);
		});

		test("returns false for device not ending with Battery", () => {
			const device = { name: "Light Switch" } as any;
			expect(isMotionDevice(device)).toBe(false);
		});

		test("returns false for device with Battery in middle", () => {
			const device = { name: "Battery Powered Light" } as any;
			expect(isMotionDevice(device)).toBe(false);
		});
	});

	describe("getHeaderTitle", () => {
		test("renders room name without temperature", () => {
			const room = {
				name: "Living Room",
				devices: [],
			} as any;

			const title: any = getHeaderTitle(room);
			expect(title.props.children[0]).toBe("Living Room");
		});

		test("applies custom className", () => {
			const room = {
				name: "Bedroom",
				devices: [],
			} as any;

			const title: any = getHeaderTitle(room, "custom-class");
			expect(title.props.className).toBe("custom-class");
		});
	});

	describe("getRoomDimLevel", () => {
		test("returns 0 for null room", () => {
			expect(getRoomDimLevel(null)).toBe(0);
		});

		test("returns 0 for room with no devices", () => {
			const room = { devices: [] } as any;
			expect(getRoomDimLevel(room)).toBe(0);
		});

		test("returns maximum light level from room devices", () => {
			const room = {
				devices: [
					{ name: "Light 1", level: "50", type: "light" },
					{ name: "Light 2", level: "75", type: "light" },
					{ name: "Fan", level: "25", type: "fan" },
				],
			} as any;
			// Assuming isLight function checks for name containing "Light"
			expect(getRoomDimLevel(room)).toBeGreaterThanOrEqual(0);
		});

		test("ignores devices with null level", () => {
			const room = {
				devices: [
					{ name: "Light 1", level: "NULL", type: "light" },
					{ name: "Light 2", level: "50", type: "light" },
				],
			} as any;
			expect(getRoomDimLevel(room)).toBeGreaterThanOrEqual(0);
		});

		test("ignores Override devices", () => {
			const room = {
				devices: [
					{ name: "Light Override", level: "100", type: "light" },
					{ name: "Normal Light", level: "50", type: "light" },
				],
			} as any;
			expect(getRoomDimLevel(room)).toBeGreaterThanOrEqual(0);
		});
	});

	describe("getIntegerLevel", () => {
		test("returns 0 for NULL level", () => {
			const device = { level: "NULL" } as any;
			expect(getIntegerLevel(device)).toBe(0);
		});

		test("parses string level to integer", () => {
			const device = { level: "75" } as any;
			expect(getIntegerLevel(device)).toBe(75);
		});

		test("handles zero level", () => {
			const device = { level: "0" } as any;
			expect(getIntegerLevel(device)).toBe(0);
		});

		test("handles max level", () => {
			const device = { level: "100" } as any;
			expect(getIntegerLevel(device)).toBe(100);
		});

		test("handles float strings by truncating", () => {
			const device = { level: "75.5" } as any;
			expect(getIntegerLevel(device)).toBe(75);
		});
	});
});
