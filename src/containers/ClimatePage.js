import React from 'react';
import { connect } from 'react-redux'
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import ClimatePageComponent from "../components/climate/ClimatePageComponent";
import {
	fanModeChange,
	fetchStatusIfNecessary,
	hvacModeChange, setLocalThermostatSetPoint,
	setThermostatSetPoint
} from "../actions";
import {getFormattedTemp} from "../utils/WeatherUtilities";

class ClimatePage extends React.Component
{
	componentDidMount()
	{
		this.props.fetchStatus();
	}

	render()
	{
		return <ClimatePageComponent {...this.props}/>
	}
}

export const getThermostatBattery = (deviceMap) =>
{
	return deviceMap["Thermostat Battery"] == null ? {"name": "Thermostat Battery", "level" : "100"} : deviceMap["Thermostat Battery"];
};

export const getClimateData = (rooms) => {
	if (rooms == null)
	{
		return {};
	}
	return rooms.filter(theRoom => "Climate" === theRoom.name).map(room => room.devices)[0].reduce((map, device) => {
		return (map[device.name] = device, map);
	}, {});
};

export const getThermostatDisplayInfo = deviceMap =>
{
	let anIndoorTemp = getIndoorTemp(deviceMap);
	let anIndoorHumidity = getInsideHumidity(deviceMap);
	if (isNaN(anIndoorTemp) || anIndoorHumidity === "")
	{
		return "";
	}
	return <div className="currentTemp">{getFormattedTemp(anIndoorTemp)}/{anIndoorHumidity}</div>
};

export const getThermostatModeStyle = deviceMap =>
{
	let aMode = deviceMap["Thermostat Mode"] != null ? deviceMap["Thermostat Mode"].level : null;
	if (aMode === "1")
	{
		return {color:"#DD531E"};
	} else if (aMode === "2")
	{
		return {color:"#0772B8"};
	}
	return {};
};

export const getCurrentOutsideTemp = deviceMap =>
{
	let aTemperature = deviceMap["Outside Temperature"];
	if (aTemperature == null || aTemperature.level === 'NULL')
	{
		return -1;
	}
	aTemperature = aTemperature.level;
	if (aTemperature.indexOf(" ") > -1)
	{
		aTemperature = aTemperature.substring(0, aTemperature.indexOf(" "));
	}
	return aTemperature;
};

export const getIndoorTemp = deviceMap =>
{
	return deviceMap["Inside Temperature"] != null ? parseInt(deviceMap["Inside Temperature"].level, 10) : 99;
};

export const getThermostatSetPoint = deviceMap =>
{
	let aDevice = getSetpointDevice(deviceMap);
	return aDevice != null ? parseInt(aDevice.level, 10) : 72;
};

export const getSetpointDevice = deviceMap =>
{
	return getMode(deviceMap) === "2" ? deviceMap["Cooling Setpoint"] : deviceMap["Heating Setpoint"];
};

export const getInsideHumidity = deviceMap =>
{
	return deviceMap["Inside Humidity"] != null && deviceMap["Inside Humidity"].level !== "NULL" ? roundToTwo(deviceMap["Inside Humidity"].level) + "%" : "";
};

export const getOutsideHumidity = deviceMap =>
{
	return deviceMap["Outside Humidity"] != null && deviceMap["Outside Humidity"].level !== "NULL" ? roundToTwo(deviceMap["Outside Humidity"].level) + "%" : "";
};

const roundToTwo = number =>
{
	return +(Math.round(parseFloat(number) + "e+2")  + "e-2");
};

const getFanMode = deviceMap =>
{
	//0 auto, 1 on
	return deviceMap["Thermostat Fan Mode"] != null ? deviceMap["Thermostat Fan Mode"].level : "";//"Auto", "On"
};

const getMode = deviceMap =>
{
	//1 heat, 0 off, 2 cool, 3 auto
	return deviceMap["Thermostat Mode"] != null ? deviceMap["Thermostat Mode"].level : "";
};

export const getFanModeStyle = (fanOption, deviceMap) =>
{
	return "btn btn-secondary w-100" + (getFanMode(deviceMap) === fanOption ? " active" : "");
};

export const getHVACStyle = (hvacValue, deviceMap) =>
{
	return "btn btn-secondary w-100" + (getMode(deviceMap) === hvacValue ? " active" : "");
};

const mapStateToProps = state => ({
	deviceMap: getClimateData (state.house.rooms)
});

const mapDispatchToProps = dispatch => bindActionCreators({
	back: () => push('/'),
	fetchStatus: () => fetchStatusIfNecessary(),
	sliderChange: (event) => () =>
	{
		dispatch(setLocalThermostatSetPoint(event.target.value));
	},
	slideStop: (event) => () =>
	{
		dispatch(setThermostatSetPoint(event.target.value));
	},
	fanModeChange: (value) => fanModeChange(value),
	hvacModeChange: (value) => hvacModeChange(value)
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ClimatePage)
