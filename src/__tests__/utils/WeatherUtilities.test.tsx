import {
	getHumidity,
	getInsideHumidity,
	getOutsideHumidity,
	getTemp,
	getIndoorTemp,
	getFormattedTemp,
	getTempStyle,
	getIndoorTempStyle,
} from "../../utils/WeatherUtilities";
import type { Device, DeviceMap } from "../../types";

describe("WeatherUtilities", () => {
	describe("getHumidity", () => {
		test("returns empty string when deviceMap is null", () => {
			expect(getHumidity(null)).toBe("");
		});

		test("returns empty string when no humidity device found", () => {
			const deviceMap = [
				{ id: "test", name: "Temperature", level: "75" },
			] as Device[];
			expect(getHumidity(deviceMap)).toBe("");
		});

		test("returns rounded humidity value", () => {
			const deviceMap = [
				{ id: "test", name: "Bedroom Humidity", level: "65.456" },
			] as Device[];
			expect(getHumidity(deviceMap)).toBe("65.46");
		});

		test("handles multiple devices and finds humidity device", () => {
			const deviceMap = [
				{ id: "test1", name: "Temperature", level: "75" },
				{ id: "test2", name: "Outside Humidity", level: "45.123" },
				{ id: "test3", name: "Another Device", level: "100" },
			] as Device[];
			expect(getHumidity(deviceMap)).toBe("45.12");
		});
	});

	describe("getInsideHumidity", () => {
		test('returns formatted inside humidity when "Inside Humidity" device exists', () => {
			const deviceMap = {
				"Inside Humidity": {
					id: "test",
					name: "Inside Humidity",
					level: "55.789",
				},
			} as DeviceMap;
			expect(getInsideHumidity(deviceMap)).toBe("55.79%");
		});

		test('returns empty string when "Inside Humidity" device is null', () => {
			const deviceMap = {
				"Inside Humidity": null,
			} as any;
			expect(getInsideHumidity(deviceMap)).toBe("");
		});

		test('returns empty string when "Inside Humidity" level is NULL', () => {
			const deviceMap = {
				"Inside Humidity": {
					id: "test",
					name: "Inside Humidity",
					level: "NULL",
				},
			} as DeviceMap;
			expect(getInsideHumidity(deviceMap)).toBe("");
		});

		test('returns empty string when "Inside Humidity" device does not exist', () => {
			const deviceMap = {};
			expect(getInsideHumidity(deviceMap)).toBe("");
		});
	});

	describe("getOutsideHumidity", () => {
		test('returns formatted outside humidity when "Outside Humidity" device exists', () => {
			const deviceMap = {
				"Outside Humidity": {
					id: "test",
					name: "Outside Humidity",
					level: "42.345",
				},
			} as DeviceMap;
			expect(getOutsideHumidity(deviceMap)).toBe("42.35%");
		});

		test('returns empty string when "Outside Humidity" device is null', () => {
			const deviceMap = {
				"Outside Humidity": null,
			} as any;
			expect(getOutsideHumidity(deviceMap)).toBe("");
		});

		test('returns empty string when "Outside Humidity" level is NULL', () => {
			const deviceMap = {
				"Outside Humidity": {
					id: "test",
					name: "Outside Humidity",
					level: "NULL",
				},
			} as DeviceMap;
			expect(getOutsideHumidity(deviceMap)).toBe("");
		});
	});

	describe("getTemp", () => {
		test("returns 99 when deviceMap is null", () => {
			expect(getTemp(null)).toBe(99);
		});

		test("returns 99 when no temperature device found", () => {
			const deviceMap = [
				{ id: "test", name: "Humidity", level: "65" },
			] as Device[];
			expect(getTemp(deviceMap)).toBe(99);
		});

		test("returns temperature in Fahrenheit for normal readings", () => {
			const deviceMap = [
				{ id: "test", name: "Outside Temperature", level: "75" },
			] as Device[];
			expect(getTemp(deviceMap)).toBe(75);
		});

		test("converts Celsius to Fahrenheit for readings between 15-35", () => {
			const deviceMap = [
				{ id: "test", name: "Temperature", level: "20" },
			] as Device[]; // 20°C
			const expectedF = (20 * 9) / 5 + 32; // 68°F
			expect(getTemp(deviceMap)).toBe(expectedF);
		});

		test("converts 25°C to Fahrenheit correctly", () => {
			const deviceMap = [
				{ id: "test", name: "Temperature", level: "25" },
			] as Device[];
			const expectedF = (25 * 9) / 5 + 32; // 77°F
			expect(getTemp(deviceMap)).toBe(expectedF);
		});

		test("handles edge case at 15°C", () => {
			const deviceMap = [
				{ id: "test", name: "Temperature", level: "15" },
			] as Device[];
			expect(getTemp(deviceMap)).toBe(15); // Should not convert
		});

		test("handles edge case at 35°C", () => {
			const deviceMap = [
				{ id: "test", name: "Temperature", level: "35" },
			] as Device[];
			expect(getTemp(deviceMap)).toBe(35); // Should not convert
		});
	});

	describe("getIndoorTemp", () => {
		test('returns indoor temperature when "Inside Temperature" exists', () => {
			const deviceMap = {
				"Inside Temperature": {
					id: "test",
					name: "Inside Temperature",
					level: "72.5",
				},
			} as DeviceMap;
			expect(getIndoorTemp(deviceMap)).toBe(72.5);
		});

		test('returns 99 when "Inside Temperature" is null', () => {
			const deviceMap = {
				"Inside Temperature": null,
			} as any;
			expect(getIndoorTemp(deviceMap)).toBe(99);
		});

		test('returns 99 when "Inside Temperature" does not exist', () => {
			const deviceMap = {};
			expect(getIndoorTemp(deviceMap)).toBe(99);
		});
	});

	describe("getFormattedTemp", () => {
		test("formats temperature with degree symbol", () => {
			expect(getFormattedTemp(72.456)).toBe("72°");
		});

		test("rounds temperature to nearest integer", () => {
			expect(getFormattedTemp(68.7)).toBe("69°");
		});

		test("handles negative temperatures", () => {
			expect(getFormattedTemp(-5.3)).toBe("-5°");
		});

		test("handles zero temperature", () => {
			expect(getFormattedTemp(0)).toBe("0°");
		});
	});

	describe("getTempStyle", () => {
		test("returns opacity 0 for temperature -1", () => {
			expect(getTempStyle(-1)).toEqual({ opacity: 0 });
		});

		test("returns background color for valid temperatures", () => {
			const style = getTempStyle(75);
			expect(style).toHaveProperty("backgroundColor");
			expect((style as { backgroundColor: string }).backgroundColor).toBe(
				"#bbf950",
			);
		});

		test("returns correct color for very cold temperature", () => {
			const style = getTempStyle(-10);
			expect((style as { backgroundColor: string }).backgroundColor).toBe(
				"#2757ea",
			);
		});

		test("returns correct color for very hot temperature", () => {
			const style = getTempStyle(100);
			expect((style as any).backgroundColor).toBe("#6F0015");
		});
	});

	describe("getIndoorTempStyle", () => {
		test("returns blue color for cold indoor temp < 68", () => {
			const style = getIndoorTempStyle(65);
			expect(style.backgroundColor).toBe("#3993CE");
		});

		test("returns teal color for temp 68-70", () => {
			const style = getIndoorTempStyle(69);
			expect(style.backgroundColor).toBe("#008990");
		});

		test("returns green color for temp 70-71", () => {
			const style = getIndoorTempStyle(70.5);
			expect(style.backgroundColor).toBe("#03902B");
		});

		test("returns light green color for temp 71-73", () => {
			const style = getIndoorTempStyle(72);
			expect(style.backgroundColor).toBe("#2DC558");
		});

		test("returns yellow color for temp 73-74", () => {
			const style = getIndoorTempStyle(73.5);
			expect(style.backgroundColor).toBe("#FECF3B");
		});

		test("returns orange color for temp 74-76", () => {
			const style = getIndoorTempStyle(75);
			expect(style.backgroundColor).toBe("#EC9800");
		});

		test("returns red color for temp >= 76", () => {
			const style = getIndoorTempStyle(80);
			expect(style.backgroundColor).toBe("#6F0015");
		});

		test("handles edge cases correctly", () => {
			expect(getIndoorTempStyle(68).backgroundColor).toBe("#008990");
			expect(getIndoorTempStyle(70).backgroundColor).toBe("#03902B");
			expect(getIndoorTempStyle(71).backgroundColor).toBe("#2DC558");
			expect(getIndoorTempStyle(73).backgroundColor).toBe("#FECF3B");
			expect(getIndoorTempStyle(74).backgroundColor).toBe("#EC9800");
			expect(getIndoorTempStyle(76).backgroundColor).toBe("#6F0015");
		});
	});

	describe("temperature color mapping", () => {
		test("maps various outdoor temperatures to correct colors", () => {
			// Test boundary conditions and ranges
			expect((getTempStyle(-5) as any).backgroundColor).toBe("#2757ea"); // < 0
			expect((getTempStyle(5) as any).backgroundColor).toBe("#4a9cdd"); // 0-10
			expect((getTempStyle(15) as any).backgroundColor).toBe("#68dce2"); // 10-20
			expect((getTempStyle(25) as any).backgroundColor).toBe("#86eff9"); // 20-40
			expect((getTempStyle(45) as any).backgroundColor).toBe("#75f87a"); // 40-50
			expect((getTempStyle(65) as any).backgroundColor).toBe("#6edf4f"); // 50-74
			expect((getTempStyle(77) as any).backgroundColor).toBe("#bbf950"); // 74-80
			expect((getTempStyle(82) as any).backgroundColor).toBe("#dbdd4c"); // 80-85
			expect((getTempStyle(87) as any).backgroundColor).toBe("#e8a43b"); // 85-90
			expect((getTempStyle(91) as any).backgroundColor).toBe("#df5827"); // 90-93
			expect((getTempStyle(95) as any).backgroundColor).toBe("#9a1e14"); // 93-97
			expect((getTempStyle(98) as any).backgroundColor).toBe("#6F0015"); // >= 97
		});
	});
});
