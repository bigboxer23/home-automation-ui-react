import type { Device, Room } from "../../types";
import { getTemp } from "../../utils/WeatherUtilities";

export const onCount = (room: Room): number => {
	let aCount = 0;
	if (room.devices == null) {
		return aCount;
	}
	room.devices.forEach((device) => {
		if (isDeviceOn(device)) {
			aCount++;
		}
	});
	return aCount;
};

export const isDeviceOn = function (device: Device): boolean {
	return (
		isLight(device) &&
		device.status === "1" &&
		device.level !== "NULL" &&
		!device.name?.includes("Override")
	);
};

export const isLight = (device: Device): boolean =>
	device.category === "2" ||
	device.category === "3"; /*&& !device.name.includes("Override")*/

export const isFan = (device: Device): boolean => device.category === "3";

export const areDotsHidden = (room: Room): string =>
	getCountContent(room) === "" ? "" : " hide";

export const getRoomTemp = (room: Room): string => {
	let temp = getTemp(room.devices);
	return temp < 99 ? temp + "°" : "";
};

export const getLockedStatus = (room: Room): string => {
	if (
		room.devices != null &&
		room.devices.some(
			(device) =>
				device.name != null &&
				device.name.includes("Override") &&
				device.status === "1",
		)
	) {
		return " mdi-lock-outline";
	}
	return "";
};

export const getCountContent = (room: Room): string | number => {
	let aCount = onCount(room);
	return aCount === 0 ? getRoomTemp(room) : aCount;
};

export const getBatteryWarningStyle = (room: Room): string => {
	let aLowBatteries = room.devices.find((device) => {
		return (
			device.name != null &&
			device.name.endsWith("Battery") &&
			parseInt(device.level ?? "0", 10) < 40 &&
			parseInt(device.level ?? "0", 10) !== 0
		);
	});
	if (aLowBatteries != null) {
		return " danger";
	}
	return "";
};

export const getButtonStyle = (room: Room): string => {
	return isOn(room) ? "success" : "default";
};

export const isOn = function (room: Room): boolean {
	if (room.devices == null) {
		return false;
	}
	let onDevice = room.devices.find((device) => {
		return isDeviceOn(device);
	});
	return onDevice != null;
};
