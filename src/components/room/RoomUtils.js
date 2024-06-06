import { getTemp } from "../../utils/WeatherUtilities";

export const onCount = (room) => {
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

export const isDeviceOn = function (device) {
	return (
		isLight(device) &&
		device.status === "1" &&
		device.level !== "NULL" &&
		!device.name.includes("Override")
	);
};

export const isLight = (device) =>
	device.category === "2" ||
	device.category === "3"; /*&& !device.name.includes("Override")*/

export const isFan = (device) => device.category === "3";

export const areDotsHidden = (room) =>
	getCountContent(room) === "" ? "" : " hide";

export const getRoomTemp = (room) => {
	let temp = getTemp(room.devices);
	return temp < 99 ? temp + "°" : "";
};

export const getLockedStatus = (room) => {
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

export const getCountContent = (room) => {
	let aCount = onCount(room);
	return aCount === 0 ? getRoomTemp(room) : aCount;
};

export const getBatteryWarningStyle = (room) => {
	let aLowBatteries = room.devices.find((device) => {
		return (
			device.name != null &&
			device.name.endsWith("Battery") &&
			parseInt(device.level, 10) < 40 &&
			parseInt(device.level, 10) !== 0
		);
	});
	if (aLowBatteries != null) {
		return " danger";
	}
	return "";
};

export const getButtonStyle = (room) => {
	return isOn(room) ? "success" : "default";
};

export const isOn = function (room) {
	if (room.devices == null) {
		return false;
	}
	let onDevice = room.devices.find((device) => {
		return isDeviceOn(device);
	});
	return onDevice != null;
};
