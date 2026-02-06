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
import type { Device, DeviceMap, Room, RootState } from "../types";

interface ClimatePageProps {
	fetchStatus: () => void;
	[key: string]: any;
}

class ClimatePage extends React.Component<ClimatePageProps> {
	componentDidMount() {
		this.props.fetchStatus();
	}

	render() {
		return <ClimatePageComponent {...(this.props as any)} />;
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

export const getClimateData = (rooms: Room[]): DeviceMap => {
	if (rooms == null) {
		return {};
	}
	return rooms
		.filter((theRoom: Room) => "Climate" === theRoom.name)
		.map((room: Room) => room.devices)[0]
		.reduce((map: DeviceMap, device) => {
			return ((map[device.name] = device), map);
		}, {});
};

export const getThermostatDisplayInfo = (
	deviceMap: DeviceMap,
): React.ReactNode => {
	let anIndoorTemp = getIndoorTemp(deviceMap);
	let anIndoorHumidity = getInsideHumidity(deviceMap);
	if (isNaN(anIndoorTemp) || anIndoorHumidity === "") {
		return "";
	}
	return (
		<div className="currentTemp minor-text">
			{getFormattedTemp(anIndoorTemp)} / {anIndoorHumidity}
		</div>
	);
};

export const getWaterHeaterColor = (deviceMap: DeviceMap): string => {
	const tankFullness =
		deviceMap["Water Heater"] && deviceMap["Water Heater"].humidity;
	const compressorRunning =
		deviceMap["Water Heater"] && deviceMap["Water Heater"].status;
	if (tankFullness !== undefined && tankFullness <= 0.2) {
		return "btn-danger";
	}
	let whClass =
		compressorRunning !== null && compressorRunning !== "off"
			? "wh-temp-gauge-active "
			: "opacity-0";
	if (tankFullness !== undefined && tankFullness >= 1) {
		return whClass + " wh-temp-gauge-full";
	}
	return whClass;
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

export const getFanModeStyle = (
	fanOption: string,
	deviceMap: DeviceMap,
): string => {
	return (
		"btn btn-secondary w-100" +
		(getFanMode(deviceMap) === fanOption ? " active" : "")
	);
};

export const getHVACStyle = (
	hvacValue: string,
	deviceMap: DeviceMap,
): string => {
	return (
		"btn btn-secondary w-100" +
		(getMode(deviceMap) === hvacValue ? " active" : "")
	);
};

const mapStateToProps = (state: RootState) => ({
	deviceMap: getClimateData(state.house.rooms),
});

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			back: () => push("/"),
			fetchStatus: () => fetchStatusIfNecessary(),
			sliderChange: (event: any, newValue: number) => () => {
				dispatch(setLocalThermostatSetPoint(newValue));
			},
			slideStop: (event: any, newValue: number) => () => {
				dispatch(setThermostatSetPoint(newValue));
			},
			fanModeChange: (value: string) => fanModeChange(value),
			hvacModeChange: (value: string) => hvacModeChange(value),
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(ClimatePage);
