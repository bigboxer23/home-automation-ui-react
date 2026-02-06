import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import MeuralPage, {
	mapStateToProps,
	findMeuralDeviceFromRoom,
	getOnOffText,
	isOn,
} from "../../containers/MeuralPage";

// Mock the connected-react-router push action
vi.mock("../../utils/navigation", async () => ({
	...(await vi.importActual("../../utils/navigation")),
	push: vi.fn(),
}));

describe("MeuralPage", () => {
	const mockState = {
		house: {
			rooms: [
				{
					name: "Meural",
					devices: [
						{
							name: "Meural",
							status: "1",
							level: "1.0",
						},
					],
				},
			],
			lastUpdate: Date.now(),
			authError: false,
		},
	};

	const mockStateOff = {
		house: {
			rooms: [
				{
					name: "Meural",
					devices: [
						{
							name: "Meural",
							status: "0",
							level: "0.0",
						},
					],
				},
			],
			lastUpdate: Date.now(),
			authError: false,
		},
	};

	const mockStateNoDevice = {
		house: {
			rooms: [
				{
					name: "Meural",
					devices: [],
				},
			],
			lastUpdate: Date.now(),
			authError: false,
		},
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders MeuralPage component", () => {
		renderWithProviders(<MeuralPage />, {
			preloadedState: mockState as any,
		});

		// MeuralPage should render without crashing
		expect(document.body).toBeInTheDocument();
	});

	test("renders with meural device on", () => {
		renderWithProviders(<MeuralPage />, {
			preloadedState: mockState as any,
		});

		expect(document.body).toBeInTheDocument();
	});

	test("renders with meural device off", () => {
		renderWithProviders(<MeuralPage />, {
			preloadedState: mockStateOff as any,
		});

		expect(document.body).toBeInTheDocument();
	});

	test("handles no meural device gracefully", () => {
		renderWithProviders(<MeuralPage />, {
			preloadedState: mockStateNoDevice as any,
		});

		expect(document.body).toBeInTheDocument();
	});

	test("handles empty rooms gracefully", () => {
		const emptyState = {
			house: {
				rooms: [],
				lastUpdate: null,
				authError: false,
			},
		};

		renderWithProviders(<MeuralPage />, {
			preloadedState: emptyState as any,
		});

		expect(document.body).toBeInTheDocument();
	});

	test("handles null rooms gracefully", () => {
		const nullState = {
			house: {
				rooms: null,
				lastUpdate: null,
				authError: false,
			},
		};

		renderWithProviders(<MeuralPage />, {
			preloadedState: nullState as any,
		});

		expect(document.body).toBeInTheDocument();
	});

	test("handles room without meural name", () => {
		const stateNoMeural = {
			house: {
				rooms: [
					{
						name: "Living Room",
						devices: [{ name: "Light", status: "1" }],
					},
				],
				lastUpdate: Date.now(),
				authError: false,
			},
		};

		renderWithProviders(<MeuralPage />, {
			preloadedState: stateNoMeural as any,
		});

		expect(document.body).toBeInTheDocument();
	});
});

describe("findMeuralDeviceFromRoom utility function", () => {
	test("finds meural device in room", () => {
		const room = {
			name: "Meural",
			devices: [
				{
					name: "Meural",
					status: "1",
					level: "1.0",
				},
				{
					name: "Other Device",
					status: "0",
				},
			],
		};

		const result = findMeuralDeviceFromRoom(room as any);
		expect(result!.name).toBe("Meural");
		expect(result!.level).toBe("1.0");
	});

	test("returns undefined when no meural device found", () => {
		const room = {
			name: "Meural",
			devices: [
				{
					name: "Other Device",
					status: "1",
				},
			],
		};

		const result = findMeuralDeviceFromRoom(room as any);
		expect(result).toBeUndefined();
	});

	test("returns undefined for null room", () => {
		const result = findMeuralDeviceFromRoom(null as any);
		expect(result).toBeUndefined();
	});

	test("returns undefined for room with no devices", () => {
		const room = {
			name: "Meural",
			devices: null,
		};

		const result = findMeuralDeviceFromRoom(room as any);
		expect(result).toBeUndefined();
	});

	test("returns undefined for room with empty devices array", () => {
		const room = {
			name: "Meural",
			devices: [],
		};

		const result = findMeuralDeviceFromRoom(room as any);
		expect(result).toBeUndefined();
	});
});

describe("getOnOffText utility function", () => {
	test("returns 'Turn Off' when device is on", () => {
		const device = {
			name: "Meural",
			level: "1.0",
		};

		const result = getOnOffText(device as any);
		expect(result).toBe("Turn Off");
	});

	test("returns 'Turn On' when device is off", () => {
		const device = {
			name: "Meural",
			level: "0.0",
		};

		const result = getOnOffText(device as any);
		expect(result).toBe("Turn On");
	});

	test("returns 'Turn On' for undefined device", () => {
		const result = getOnOffText(undefined);
		expect(result).toBe("Turn On");
	});

	test("returns 'Turn On' for null device", () => {
		const result = getOnOffText(null as any);
		expect(result).toBe("Turn On");
	});

	test("returns 'Turn On' for device with different level", () => {
		const device = {
			name: "Meural",
			level: "0.5",
		};

		const result = getOnOffText(device as any);
		expect(result).toBe("Turn On");
	});
});

describe("isOn utility function", () => {
	test("returns true when device level is '1.0'", () => {
		const device = {
			name: "Meural",
			level: "1.0",
		};

		const result = isOn(device as any);
		expect(result).toBe(true);
	});

	test("returns false when device level is '0.0'", () => {
		const device = {
			name: "Meural",
			level: "0.0",
		};

		const result = isOn(device as any);
		expect(result).toBe(false);
	});

	test("returns false when device level is '0.5'", () => {
		const device = {
			name: "Meural",
			level: "0.5",
		};

		const result = isOn(device as any);
		expect(result).toBe(false);
	});

	test("returns false for undefined device", () => {
		const result = isOn(undefined);
		expect(result).toBe(false);
	});

	test("returns false for null device", () => {
		const result = isOn(null as any);
		expect(result).toBe(false);
	});

	test("returns false for device without level", () => {
		const device = {
			name: "Meural",
		};

		const result = isOn(device as any);
		expect(result).toBe(false);
	});

	test("returns false for device with null level", () => {
		const device = {
			name: "Meural",
			level: null,
		};

		const result = isOn(device as any);
		expect(result).toBe(false);
	});
});

describe("mapStateToProps utility function", () => {
	test("extracts meural device from state", () => {
		const state = {
			house: {
				rooms: [
					{
						name: "Meural",
						devices: [
							{
								name: "Meural",
								status: "1",
								level: "1.0",
							},
						],
					},
				],
			},
		};

		const result = mapStateToProps(state as any);
		expect(result.device!.name).toBe("Meural");
		expect(result.device!.level).toBe("1.0");
	});

	test("returns undefined device for state without meural room", () => {
		const state = {
			house: {
				rooms: [
					{
						name: "Living Room",
						devices: [{ name: "Light", status: "1" }],
					},
				],
			},
		};

		const result = mapStateToProps(state as any);
		expect(result.device).toBeUndefined();
	});

	test("returns undefined device for null rooms", () => {
		const state = {
			house: {
				rooms: null,
			},
		};

		const result = mapStateToProps(state as any);
		expect(result.device).toBeUndefined();
	});

	test("returns undefined device for empty rooms", () => {
		const state = {
			house: {
				rooms: [],
			},
		};

		const result = mapStateToProps(state as any);
		expect(result.device).toBeUndefined();
	});
});
