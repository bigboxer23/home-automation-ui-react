import React from "react";
import { connect } from "react-redux";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import ClimatePageComponent from "../components/climate/ClimatePageComponent";
import {
	fanModeChange,
	fetchStatusIfNecessary,
	hvacModeChange,
	setLocalThermostatSetPoint,
	setThermostatSetPoint,
} from "../actions";
import {
	getFormattedTemp,
	getIndoorTemp,
	getInsideHumidity,
} from "../utils/WeatherUtilities";
import ThermostatComponent, {
	getName,
} from "../components/climate/ClimateSensorComponent";
import type { AppDispatch, Device, DeviceMap, Room, RootState } from "../types";
import { findRoomDevices, toDeviceMap } from "../utils/RoomLookup";

type ClimatePageProps = React.ComponentProps<typeof ClimatePageComponent> & {
	fetchStatus: () => void;
};

class ClimatePage extends React.Component<ClimatePageProps> {
	componentDidMount() {
		this.props.fetchStatus();
	}

	render() {
		return <ClimatePageComponent {...this.props} />;
	}
}

export const getThermometerItems = (deviceMap: DeviceMap): React.ReactNode => {
	if (deviceMap == null) {
		return "";
	}
	let aSensorNames = Object.keys(deviceMap)
		.filter((theDeviceName: string) => theDeviceName.endsWith(" Air Quality"))
		.map((theDeviceName: string) =>
			theDeviceName.substr(0, theDeviceName.indexOf(" Air Quality")),
		);
	let aSensors = aSensorNames.map((theSensorName: string) => {
		return Object.keys(deviceMap)
			.filter((theDeviceName: string) =>
				theDeviceName.startsWith(theSensorName),
			)
			.map((theDeviceName: string) => deviceMap[theDeviceName]);
	});
	return aSensors.map((theDevice) => (
		<ThermostatComponent key={getName(theDevice)} deviceMap={theDevice} />
	));
};

export const getThermostatBattery = (deviceMap: DeviceMap): Device => {
	return deviceMap["Thermostat Battery"] == null
		? { id: "", name: "Thermostat Battery", level: "100" }
		: deviceMap["Thermostat Battery"];
};

export const getClimateData = (rooms: Room[]): DeviceMap =>
	toDeviceMap(findRoomDevices(rooms, "Climate"));

export const getThermostatDisplayInfo = (
	deviceMap: DeviceMap,
): React.ReactNode => {
	let anIndoorTemp = getIndoorTemp(deviceMap);
	let anIndoorHumidity = getInsideHumidity(deviceMap);
	if (isNaN(anIndoorTemp) || anIndoorHumidity === "") {
		return "";
	}
	return (
		<div className="text-black/80 text-[0.8rem] leading-[1.3] opacity-70">
			{getFormattedTemp(anIndoorTemp)} / {anIndoorHumidity}
		</div>
	);
};

/**
 * Fill colour and corner rounding for the water heater tank gauge.
 *
 * The radius is decided here rather than layered over a base on the element: a
 * conditional `rounded-lg` sitting on top of a `rounded-l-lg` would tie on
 * specificity and be settled by Tailwind's output order. A full tank is rounded
 * at both ends, a partial one only on the left, and exactly one of the two
 * reaches the element.
 */
export const getWaterHeaterGaugeStyle = (deviceMap: DeviceMap): string => {
	const tankFullness =
		deviceMap["Water Heater"] && deviceMap["Water Heater"].humidity;
	const compressorRunning =
		deviceMap["Water Heater"] && deviceMap["Water Heater"].status;
	const radius =
		tankFullness !== undefined && tankFullness >= 1
			? "rounded-lg"
			: "rounded-l-lg";
	if (tankFullness !== undefined && tankFullness <= 0.2) {
		return "bg-danger " + radius;
	}
	const fill =
		compressorRunning !== null && compressorRunning !== "off"
			? "bg-accent"
			: "opacity-0";
	return fill + " " + radius;
};

export const getWaterHeaterWidth = (
	deviceMap: DeviceMap,
): React.CSSProperties => {
	const tankFullness =
		deviceMap["Water Heater"] && deviceMap["Water Heater"].humidity;
	const pixelFullness = 40 * (tankFullness ?? 0);
	return { width: pixelFullness + "px" };
};

export const getWaterHeaterCurrentTemp = (deviceMap: DeviceMap): string => {
	return getFormattedTemp(
		deviceMap["Water Heater"] && deviceMap["Water Heater"].category,
	);
};

export const getWaterHeaterTemperature = (deviceMap: DeviceMap): string => {
	if (deviceMap["Water Heater"]) {
		return (
			getFormattedTemp(deviceMap["Water Heater"].temperature) +
			" / " +
			Math.round(parseFloat(deviceMap["Water Heater"].level ?? "0") * 10) / 10 +
			"kWh"
		);
	}
	return "";
};

export const getThermostatModeStyle = (
	deviceMap: DeviceMap,
): React.CSSProperties => {
	let aMode =
		deviceMap["Thermostat Mode"] != null
			? deviceMap["Thermostat Mode"].level
			: null;
	if (aMode === "1") {
		return { color: "#DD531E" };
	} else if (aMode === "2") {
		return { color: "#0772B8" };
	}
	return {};
};

export const getCurrentOutsideTemp = (
	deviceMap: DeviceMap,
): number | string => {
	let aDevice = deviceMap["Outside Temperature"];
	if (aDevice == null || aDevice.level === "NULL") {
		return -1;
	}
	let aTemperature: string = aDevice.level ?? "";
	if (aTemperature.indexOf(" ") > -1) {
		aTemperature = aTemperature.substring(0, aTemperature.indexOf(" "));
	}
	return aTemperature;
};

export const getThermostatSetPoint = (deviceMap: DeviceMap): number => {
	let aDevice = getSetpointDevice(deviceMap);
	return aDevice != null ? parseInt(aDevice.level ?? "72", 10) : 72;
};

export const getSetpointDevice = (deviceMap: DeviceMap) => {
	return getMode(deviceMap) === "2"
		? deviceMap["Cooling Setpoint"]
		: deviceMap["Heating Setpoint"];
};

const getFanMode = (deviceMap: DeviceMap): string => {
	//0 auto, 1 on
	return deviceMap["Thermostat Fan Mode"] != null
		? (deviceMap["Thermostat Fan Mode"].level ?? "")
		: ""; //"Auto", "On"
};

const getMode = (deviceMap: DeviceMap): string => {
	//1 heat, 0 off, 2 cool, 3 auto
	return deviceMap["Thermostat Mode"] != null
		? (deviceMap["Thermostat Mode"].level ?? "")
		: "";
};

export const isFanModeActive = (
	fanOption: string,
	deviceMap: DeviceMap,
): boolean => getFanMode(deviceMap) === fanOption;

export const isHVACModeActive = (
	hvacValue: string,
	deviceMap: DeviceMap,
): boolean => getMode(deviceMap) === hvacValue;

const mapStateToProps = (state: RootState) => ({
	deviceMap: getClimateData(state.house.rooms),
});

/** MUI types a slider value as `number | number[]`; ours are single-value. */
const sliderValue = (value: number | number[]): number =>
	Array.isArray(value) ? value[0] : value;

const mapDispatchToProps = (dispatch: AppDispatch) =>
	bindActionCreators(
		{
			back: () => push("/"),
			fetchStatus: () => fetchStatusIfNecessary(),
			sliderChange: (_event: Event, newValue: number | number[]) =>
				setLocalThermostatSetPoint(sliderValue(newValue)),
			slideStop: (
				_event: Event | React.SyntheticEvent,
				newValue: number | number[],
			) => setThermostatSetPoint(sliderValue(newValue)),
			fanModeChange: (value: string) => fanModeChange(value),
			hvacModeChange: (value: string) => hvacModeChange(value),
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(ClimatePage);
