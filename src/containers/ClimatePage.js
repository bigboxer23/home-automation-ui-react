import React from 'react';
import { connect } from 'react-redux'
import {push} from 'connected-react-router';
import {bindActionCreators} from "redux";
import ClimatePageComponent from "../components/climate/ClimatePageComponent";
import {
	fanModeChange,
	fetchStatusIfNecessary,
	hvacModeChange, setLocalThermostatSetPoint,
	setThermostatSetPoint
} from "../actions";
import {getFormattedTemp, getIndoorTemp, getInsideHumidity} from "../utils/WeatherUtilities";
import ThermostatComponent, {getName} from "../components/climate/ClimateSensorComponent";

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

export const getThermometerItems = (deviceMap) =>
{
	if (deviceMap == null)
	{
		return "";
	}
	let aSensorNames = Object.keys(deviceMap)
			.filter(theDeviceName => theDeviceName.endsWith(" Air Quality"))
			.map(theDeviceName => theDeviceName.substr(0, theDeviceName.indexOf(" Air Quality")));
	let aSensors = aSensorNames
			.map(theSensorName =>
			{
				return Object.keys(deviceMap)
						.filter(theDeviceName => theDeviceName.startsWith(theSensorName))
						.map(theDeviceName => deviceMap[theDeviceName]);
			});
	return aSensors.map(theDevice => <ThermostatComponent key={getName(theDevice)} deviceMap={theDevice}/>);
};

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

export const getThermostatSetPoint = deviceMap =>
{
	let aDevice = getSetpointDevice(deviceMap);
	return aDevice != null ? parseInt(aDevice.level, 10) : 72;
};

export const getSetpointDevice = deviceMap =>
{
	return getMode(deviceMap) === "2" ? deviceMap["Cooling Setpoint"] : deviceMap["Heating Setpoint"];
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
	sliderChange: (event, newValue) => () =>
	{
		dispatch(setLocalThermostatSetPoint(newValue));
	},
	slideStop: (event, newValue) => () =>
	{
		dispatch(setThermostatSetPoint(newValue));
	},
	fanModeChange: (value) => fanModeChange(value),
	hvacModeChange: (value) => hvacModeChange(value)
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ClimatePage)
