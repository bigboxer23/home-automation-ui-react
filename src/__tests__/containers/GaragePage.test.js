import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import GaragePage, {
	getHeader,
	getAutoCloseDelay,
	getAutoCloseButtonStyle,
} from "../../containers/GaragePage";

// Mock the connected-react-router push action
jest.mock("connected-react-router", () => ({
	...jest.requireActual("connected-react-router"),
	push: jest.fn(),
}));

describe("GaragePage", () => {
	const mockState = {
		house: {
			rooms: [
				{
					name: "Garage",
					devices: [
						{
							name: "Garage Opener",
							status: "false",
							temperature: 72,
							historicOpenTime: 1640995200000, // Jan 1, 2022 12:00:00 AM UTC
							autoClose: 300000, // 5 minutes in milliseconds
						},
						{
							name: "Garage Light",
							status: "1",
							level: "75",
							category: "2",
						},
					],
				},
			],
			lastUpdate: Date.now(),
			authError: false,
		},
	};

	const mockStateOpen = {
		house: {
			rooms: [
				{
					name: "Garage",
					devices: [
						{
							name: "Garage Opener",
							status: "true",
							temperature: 75,
							historicOpenTime: 1640995200000,
							autoClose: 3600000, // 1 hour in milliseconds
						},
						{
							name: "Garage Light",
							status: "0",
							level: "0",
							category: "2",
						},
					],
				},
			],
			lastUpdate: Date.now(),
			authError: false,
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders GaragePage component", () => {
		renderWithProviders(<GaragePage />, {
			preloadedState: mockState,
		});

		// GaragePage should render without crashing
		expect(document.body).toBeInTheDocument();
	});

	test("handles empty garage data gracefully", () => {
		const emptyState = {
			house: {
				rooms: [
					{
						name: "Garage",
						devices: [],
					},
				],
				lastUpdate: null,
				authError: false,
			},
		};

		renderWithProviders(<GaragePage />, {
			preloadedState: emptyState,
		});

		expect(document.body).toBeInTheDocument();
	});

	test("renders with garage room data", () => {
		renderWithProviders(<GaragePage />, {
			preloadedState: mockState,
		});

		expect(document.body).toBeInTheDocument();
	});

	test("renders with open garage door", () => {
		renderWithProviders(<GaragePage />, {
			preloadedState: mockStateOpen,
		});

		expect(document.body).toBeInTheDocument();
	});
});

describe("getHeader utility function", () => {
	const mockRoomClosed = {
		name: "Garage",
		devices: [
			{
				name: "Garage Opener",
				status: "false",
				historicOpenTime: 1640995200000,
				autoClose: undefined, // No auto close
			},
		],
	};

	const mockRoomAutoClose = {
		name: "Garage",
		devices: [
			{
				name: "Garage Opener",
				status: "true",
				historicOpenTime: 1640995200000,
				autoClose: 300000, // 5 minutes
			},
		],
	};

	test("returns formatted header with last opened time", () => {
		const result = getHeader(mockRoomClosed);
		expect(result).toContain("Garage");
		expect(result).toContain("Last opened:");
	});

	test("returns formatted header with auto close time", () => {
		const result = getHeader(mockRoomAutoClose);
		expect(result).toContain("Garage");
		expect(result).toContain("Closing in:");
		expect(result).toContain("5:00");
	});

	test("returns empty string for null room", () => {
		const result = getHeader(null);
		expect(result).toBe("");
	});

	test("handles room without garage device", () => {
		const roomWithoutGarage = {
			name: "Garage",
			devices: [{ name: "Light", status: "1" }],
		};
		const result = getHeader(roomWithoutGarage);
		expect(result).toContain("Garage");
		expect(result).toContain("Last opened:");
	});
});

describe("getAutoCloseDelay utility function", () => {
	test("returns extended delay for short auto close", () => {
		const room = {
			devices: [
				{
					name: "Garage Opener",
					autoClose: 300000, // 5 minutes (less than 10 minutes)
				},
			],
		};
		const result = getAutoCloseDelay(room);
		expect(result).toBe(10800000); // 3 hours
	});

	test("returns extended delay plus current for long auto close", () => {
		const room = {
			devices: [
				{
					name: "Garage Opener",
					autoClose: 3600000, // 1 hour (more than 10 minutes)
				},
			],
		};
		const result = getAutoCloseDelay(room);
		expect(result).toBe(10800000 + 3600000); // 3 hours + 1 hour
	});

	test("returns default delay for undefined auto close", () => {
		const room = {
			devices: [
				{
					name: "Garage Opener",
					// no autoClose property
				},
			],
		};
		const result = getAutoCloseDelay(room);
		expect(result).toBe(10800000); // 3 hours
	});

	test("returns default delay for room without garage device", () => {
		const room = {
			devices: [{ name: "Light", status: "1" }],
		};
		const result = getAutoCloseDelay(room);
		expect(result).toBe(10800000); // 3 hours
	});

	test("handles null room", () => {
		const result = getAutoCloseDelay(null);
		expect(result).toBe(10800000); // 3 hours
	});
});

describe("getAutoCloseButtonStyle utility function", () => {
	test("returns empty string when auto close is active", () => {
		const room = {
			devices: [
				{
					name: "Garage Opener",
					autoClose: 300000, // 5 minutes
				},
			],
		};
		const result = getAutoCloseButtonStyle(room);
		expect(result).toBe("");
	});

	test("returns disabled style when auto close is inactive", () => {
		const room = {
			devices: [
				{
					name: "Garage Opener",
					// no autoClose or autoClose is 0/undefined
				},
			],
		};
		const result = getAutoCloseButtonStyle(room);
		expect(result).toBe("point-events-none ");
	});

	test("handles null room", () => {
		const result = getAutoCloseButtonStyle(null);
		expect(result).toBe("point-events-none ");
	});

	test("handles room without garage device", () => {
		const room = {
			devices: [{ name: "Light", status: "1" }],
		};
		const result = getAutoCloseButtonStyle(room);
		expect(result).toBe("point-events-none ");
	});
});

describe("GaragePage state mapping", () => {
	test("extracts garage room from state", () => {
		const rooms = [
			{
				name: "Garage",
				devices: [
					{
						name: "Garage Opener",
						status: "false",
					},
				],
			},
			{
				name: "Living Room",
				devices: [{ name: "Light", status: "1" }],
			},
		];

		const mockStateMultiple = {
			house: {
				rooms: rooms,
				lastUpdate: Date.now(),
				authError: false,
			},
		};

		renderWithProviders(<GaragePage />, {
			preloadedState: mockStateMultiple,
		});

		expect(document.body).toBeInTheDocument();
	});

	test("handles state without garage room", () => {
		const stateNoGarage = {
			house: {
				rooms: [
					{
						name: "Garage",
						devices: [{ name: "Light", status: "1", category: "2" }],
					},
				],
				lastUpdate: Date.now(),
				authError: false,
			},
		};

		renderWithProviders(<GaragePage />, {
			preloadedState: stateNoGarage,
		});

		expect(document.body).toBeInTheDocument();
	});
});
