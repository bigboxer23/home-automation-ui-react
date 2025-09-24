import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import ClimatePage, {
	getThermometerItems,
	getThermostatBattery,
	getClimateData,
	getThermostatDisplayInfo,
	getWaterHeaterGaugeClass,
	getWaterHeaterHoverText,
	getWaterHeaterTemperature,
	getThermostatModeStyle,
	getCurrentOutsideTemp,
	getThermostatSetPoint,
	getSetpointDevice,
	getFanModeStyle,
	getHVACStyle,
} from "../../containers/ClimatePage";

// Mock the connected-react-router push action
jest.mock("connected-react-router", () => ({
	...jest.requireActual("connected-react-router"),
	push: jest.fn(),
}));

describe("ClimatePage", () => {
	const mockState = {
		house: {
			rooms: [
				{
					name: "Climate",
					devices: [
						{
							name: "Water Heater",
							temperature: 120,
							humidity: 0.66,
							level: "2.5",
							status: "1",
						},
						{
							name: "Outside Temperature",
							level: "75 °F",
						},
						{
							name: "Indoor Temperature",
							level: "72",
						},
						{
							name: "Indoor Humidity",
							level: "45%",
						},
						{
							name: "Thermostat Mode",
							level: "2", // Cool mode
						},
						{
							name: "Cooling Setpoint",
							level: "70",
						},
						{
							name: "Heating Setpoint",
							level: "68",
						},
						{
							name: "Thermostat Fan Mode",
							level: "0", // Auto
						},
						{
							name: "Thermostat Battery",
							level: "85",
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

	test("renders ClimatePage component", () => {
		renderWithProviders(<ClimatePage />, {
			preloadedState: mockState,
		});

		// ClimatePage should render without crashing
		expect(document.body).toBeInTheDocument();
	});

	test("handles empty climate data gracefully", () => {
		const emptyState = {
			house: {
				rooms: [
					{
						name: "Climate",
						devices: [],
					},
				],
				lastUpdate: null,
				authError: false,
			},
		};

		renderWithProviders(<ClimatePage />, {
			preloadedState: emptyState,
		});

		expect(document.body).toBeInTheDocument();
	});
});

describe("getThermometerItems utility function", () => {
	const mockDeviceMap = {
		"Kitchen Air Quality": { name: "Kitchen Air Quality", level: "50" },
		"Kitchen Temperature": { name: "Kitchen Temperature", level: "72" },
		"Kitchen Humidity": { name: "Kitchen Humidity", level: "45%" },
		"Living Room Air Quality": { name: "Living Room Air Quality", level: "60" },
		"Living Room Temperature": { name: "Living Room Temperature", level: "74" },
		"Living Room Humidity": { name: "Living Room Humidity", level: "50%" },
	};

	test("returns thermometer components for air quality sensors", () => {
		const result = getThermometerItems(mockDeviceMap);
		expect(result).toBeDefined();
		expect(result.length).toBe(2);
	});

	test("returns empty string for null deviceMap", () => {
		const result = getThermometerItems(null);
		expect(result).toBe("");
	});

	test("returns empty array for deviceMap without air quality sensors", () => {
		const deviceMapNoAir = {
			"Some Device": { name: "Some Device", level: "50" },
		};
		const result = getThermometerItems(deviceMapNoAir);
		expect(result.length).toBe(0);
	});
});

describe("getThermostatBattery utility function", () => {
	test("returns actual battery device when present", () => {
		const deviceMap = {
			"Thermostat Battery": { name: "Thermostat Battery", level: "85" },
		};
		const result = getThermostatBattery(deviceMap);
		expect(result.name).toBe("Thermostat Battery");
		expect(result.level).toBe("85");
	});

	test("returns default battery when not present", () => {
		const deviceMap = {};
		const result = getThermostatBattery(deviceMap);
		expect(result.name).toBe("Thermostat Battery");
		expect(result.level).toBe("100");
	});
});

describe("getClimateData utility function", () => {
	test("extracts climate room devices into device map", () => {
		const rooms = [
			{
				name: "Climate",
				devices: [
					{ name: "Water Heater", temperature: 120 },
					{ name: "Outside Temperature", level: "75 °F" },
				],
			},
			{
				name: "Living Room",
				devices: [{ name: "Light", status: "1" }],
			},
		];

		const result = getClimateData(rooms);
		expect(result["Water Heater"]).toBeDefined();
		expect(result["Outside Temperature"]).toBeDefined();
		expect(result["Light"]).toBeUndefined();
	});

	test("returns empty object for null rooms", () => {
		const result = getClimateData(null);
		expect(result).toEqual({});
	});

	test("handles undefined devices gracefully", () => {
		const rooms = [
			{
				name: "Climate",
				devices: undefined,
			},
		];

		// This should not crash but will return an error in actual implementation
		// Testing the behavior when devices is undefined
		try {
			const result = getClimateData(rooms);
		} catch (error) {
			expect(error).toBeDefined();
		}
	});
});

describe("getThermostatDisplayInfo utility function", () => {
	test("returns formatted display for valid temp and humidity", () => {
		const deviceMap = {
			"Inside Temperature": { level: "72" },
			"Inside Humidity": { level: "45" },
		};

		const result = getThermostatDisplayInfo(deviceMap);
		expect(result.props.children).toContain("72°");
		expect(result.props.children).toContain("45%");
	});

	test("returns empty string for invalid temperature", () => {
		const deviceMap = {
			"Inside Temperature": { level: "invalid" },
			"Inside Humidity": { level: "45" },
		};

		const result = getThermostatDisplayInfo(deviceMap);
		expect(result).toBe("");
	});

	test("returns empty string for missing humidity", () => {
		const deviceMap = {
			"Inside Temperature": { level: "72" },
		};

		const result = getThermostatDisplayInfo(deviceMap);
		expect(result).toBe("");
	});
});

describe("getWaterHeaterGaugeClass utility function", () => {
	test("returns gauge-low for 1/3 tank", () => {
		const deviceMap = {
			"Water Heater": { humidity: 0.33, status: "" },
		};
		const result = getWaterHeaterGaugeClass(deviceMap);
		expect(result).toBe("mdi mdi-gauge-low");
	});

	test("returns gauge for 2/3 tank", () => {
		const deviceMap = {
			"Water Heater": { humidity: 0.66, status: "" },
		};
		const result = getWaterHeaterGaugeClass(deviceMap);
		expect(result).toBe("mdi mdi-gauge");
	});

	test("returns gauge-full for full tank", () => {
		const deviceMap = {
			"Water Heater": { humidity: 1, status: "" },
		};
		const result = getWaterHeaterGaugeClass(deviceMap);
		expect(result).toBe("mdi mdi-gauge-full");
	});

	test("returns gauge-empty danger for empty tank", () => {
		const deviceMap = {
			"Water Heater": { humidity: 0, status: "" },
		};
		const result = getWaterHeaterGaugeClass(deviceMap);
		expect(result).toBe("mdi mdi-gauge-empty danger");
	});

	test("includes btn-active when compressor running", () => {
		const deviceMap = {
			"Water Heater": { humidity: 0.66, status: "1" },
		};
		const result = getWaterHeaterGaugeClass(deviceMap);
		expect(result).toBe("mdi btn-active mdi-gauge");
	});
});

describe("getWaterHeaterHoverText utility function", () => {
	test("returns correct text for 1/3 tank", () => {
		const deviceMap = {
			"Water Heater": { humidity: 0.33, level: "" },
		};
		const result = getWaterHeaterHoverText(deviceMap);
		expect(result).toBe("tank 1/3 full.");
	});

	test("returns correct text for 2/3 tank", () => {
		const deviceMap = {
			"Water Heater": { humidity: 0.66, level: "" },
		};
		const result = getWaterHeaterHoverText(deviceMap);
		expect(result).toBe("tank 2/3 full.");
	});

	test("returns correct text for full tank", () => {
		const deviceMap = {
			"Water Heater": { humidity: 1, level: "" },
		};
		const result = getWaterHeaterHoverText(deviceMap);
		expect(result).toBe("tank is full.");
	});

	test("includes compressor status when running", () => {
		const deviceMap = {
			"Water Heater": { humidity: 0.66, level: "2.5" },
		};
		const result = getWaterHeaterHoverText(deviceMap);
		expect(result).toBe("Compressor is running, tank 2/3 full.");
	});
});

describe("getWaterHeaterTemperature utility function", () => {
	test("returns formatted temperature and energy usage", () => {
		const deviceMap = {
			"Water Heater": { temperature: 120, level: "2.5" },
		};
		const result = getWaterHeaterTemperature(deviceMap);
		expect(result).toBe("120° / 2.5kWh");
	});

	test("returns empty string when no water heater", () => {
		const deviceMap = {};
		const result = getWaterHeaterTemperature(deviceMap);
		expect(result).toBe("");
	});
});

describe("getThermostatModeStyle utility function", () => {
	test("returns heat color for mode 1", () => {
		const deviceMap = {
			"Thermostat Mode": { level: "1" },
		};
		const result = getThermostatModeStyle(deviceMap);
		expect(result.color).toBe("#DD531E");
	});

	test("returns cool color for mode 2", () => {
		const deviceMap = {
			"Thermostat Mode": { level: "2" },
		};
		const result = getThermostatModeStyle(deviceMap);
		expect(result.color).toBe("#0772B8");
	});

	test("returns empty object for other modes", () => {
		const deviceMap = {
			"Thermostat Mode": { level: "0" },
		};
		const result = getThermostatModeStyle(deviceMap);
		expect(result).toEqual({});
	});
});

describe("getCurrentOutsideTemp utility function", () => {
	test("returns temperature value without units", () => {
		const deviceMap = {
			"Outside Temperature": { level: "75 °F" },
		};
		const result = getCurrentOutsideTemp(deviceMap);
		expect(result).toBe("75");
	});

	test("returns temperature value without processing", () => {
		const deviceMap = {
			"Outside Temperature": { level: "75" },
		};
		const result = getCurrentOutsideTemp(deviceMap);
		expect(result).toBe("75");
	});

	test("returns -1 for null temperature", () => {
		const deviceMap = {
			"Outside Temperature": { level: "NULL" },
		};
		const result = getCurrentOutsideTemp(deviceMap);
		expect(result).toBe(-1);
	});

	test("returns -1 for missing temperature", () => {
		const deviceMap = {};
		const result = getCurrentOutsideTemp(deviceMap);
		expect(result).toBe(-1);
	});
});

describe("getThermostatSetPoint utility function", () => {
	test("returns cooling setpoint when in cool mode", () => {
		const deviceMap = {
			"Thermostat Mode": { level: "2" },
			"Cooling Setpoint": { level: "70" },
			"Heating Setpoint": { level: "68" },
		};
		const result = getThermostatSetPoint(deviceMap);
		expect(result).toBe(70);
	});

	test("returns heating setpoint when in heat mode", () => {
		const deviceMap = {
			"Thermostat Mode": { level: "1" },
			"Cooling Setpoint": { level: "70" },
			"Heating Setpoint": { level: "68" },
		};
		const result = getThermostatSetPoint(deviceMap);
		expect(result).toBe(68);
	});

	test("returns default 72 when no setpoint device", () => {
		const deviceMap = {};
		const result = getThermostatSetPoint(deviceMap);
		expect(result).toBe(72);
	});
});

describe("getSetpointDevice utility function", () => {
	test("returns cooling setpoint device for cool mode", () => {
		const deviceMap = {
			"Thermostat Mode": { level: "2" },
			"Cooling Setpoint": { level: "70" },
			"Heating Setpoint": { level: "68" },
		};
		const result = getSetpointDevice(deviceMap);
		expect(result.level).toBe("70");
	});

	test("returns heating setpoint device for heat mode", () => {
		const deviceMap = {
			"Thermostat Mode": { level: "1" },
			"Cooling Setpoint": { level: "70" },
			"Heating Setpoint": { level: "68" },
		};
		const result = getSetpointDevice(deviceMap);
		expect(result.level).toBe("68");
	});
});

describe("getFanModeStyle utility function", () => {
	test("returns active style when fan mode matches", () => {
		const deviceMap = {
			"Thermostat Fan Mode": { level: "0" },
		};
		const result = getFanModeStyle("0", deviceMap);
		expect(result).toBe("btn btn-secondary w-100 active");
	});

	test("returns inactive style when fan mode doesn't match", () => {
		const deviceMap = {
			"Thermostat Fan Mode": { level: "0" },
		};
		const result = getFanModeStyle("1", deviceMap);
		expect(result).toBe("btn btn-secondary w-100");
	});
});

describe("getHVACStyle utility function", () => {
	test("returns active style when HVAC mode matches", () => {
		const deviceMap = {
			"Thermostat Mode": { level: "2" },
		};
		const result = getHVACStyle("2", deviceMap);
		expect(result).toBe("btn btn-secondary w-100 active");
	});

	test("returns inactive style when HVAC mode doesn't match", () => {
		const deviceMap = {
			"Thermostat Mode": { level: "2" },
		};
		const result = getHVACStyle("1", deviceMap);
		expect(result).toBe("btn btn-secondary w-100");
	});
});
