import type { Device, DeviceMap } from "../types";

export const getHumidity = (deviceMap: Device[] | null): string => {
	if (deviceMap == null) {
		return "";
	}
	let aDevice = deviceMap.find((device) => device.name.endsWith("Humidity"));
	return aDevice != null ? roundToTwo(aDevice.level) + "" : "";
};

export const getInsideHumidity = (deviceMap: DeviceMap): string => {
	return getDeviceHumidity(deviceMap, "Inside Humidity");
};

export const getOutsideHumidity = (deviceMap: DeviceMap): string => {
	return getDeviceHumidity(deviceMap, "Outside Humidity");
};

const getDeviceHumidity = (deviceMap: DeviceMap, deviceId: string): string => {
	return deviceMap[deviceId] != null && deviceMap[deviceId].level !== "NULL"
		? roundToTwo(deviceMap[deviceId].level) + "%"
		: "";
};

export const getTemp = (deviceMap: Device[] | null): number => {
	if (deviceMap == null) {
		return 99;
	}
	let aDevice = deviceMap.find((device) => device.name.endsWith("Temperature"));
	let aTemp = aDevice != null ? parseFloat(aDevice.level ?? "99") : 99;
	if (aTemp > 15 && aTemp < 35) {
		//C
		aTemp = (aTemp * 9) / 5 + 32;
	}
	return aTemp;
};

export const getIndoorTemp = (deviceMap: DeviceMap): number => {
	return deviceMap["Inside Temperature"] != null
		? parseFloat(deviceMap["Inside Temperature"].level ?? "99")
		: 99;
};

const roundToTwo = (number: string | undefined): number => {
	return +(Math.round(parseFloat(number + "e+2")) + "e-2");
};

export const getFormattedTemp = (
	temperature: number | string | undefined,
): string => {
	return formatTemp(temperature) + "°";
};

export const getTempStyle = (
	temperature: number | string | undefined,
): { opacity: number } | { backgroundColor: string } => {
	const temp =
		typeof temperature === "string"
			? parseFloat(temperature)
			: (temperature ?? -1);
	return temp === -1 ? { opacity: 0 } : { backgroundColor: getTempColor(temp) };
};

export const getIndoorTempStyle = (
	temperature: number,
): { backgroundColor: string } => {
	return { backgroundColor: getIndoorTempColor(temperature) };
};

const getIndoorTempColor = (temperature: number): string => {
	if (temperature < 68) {
		return "#3993CE";
	} else if (temperature < 70) {
		return "#008990";
	} else if (temperature < 71) {
		return "#03902B";
	} else if (temperature < 73) {
		return "#2DC558";
	} else if (temperature < 74) {
		return "#FECF3B";
	} else if (temperature < 76) {
		return "#EC9800";
	}
	return "#6F0015";
};

const getTempColor = (temperature: number): string => {
	if (temperature < 0) {
		return "#2757ea";
	} else if (temperature < 10) {
		return "#4a9cdd";
	} else if (temperature < 20) {
		return "#68dce2";
	} else if (temperature < 40) {
		return "#86eff9";
	} else if (temperature < 50) {
		return "#75f87a";
	} else if (temperature < 74) {
		return "#6edf4f";
	} else if (temperature < 80) {
		return "#bbf950";
	} else if (temperature < 85) {
		return "#dbdd4c";
	} else if (temperature < 90) {
		return "#e8a43b";
	} else if (temperature < 93) {
		return "#df5827";
	} else if (temperature < 97) {
		return "#9a1e14";
	}
	return "#6F0015";
};

const formatTemp = (temperature: number | string | undefined): string => {
	const temp =
		typeof temperature === "string"
			? parseFloat(temperature)
			: (temperature ?? 0);
	return (Math.round(temp * 100) / 100).toFixed(0);
};
