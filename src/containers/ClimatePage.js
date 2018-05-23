import React from 'react';
import { connect } from 'react-redux'
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import ClimatePageComponent from "../components/climate/ClimatePageComponent";
import {
	cancelFetchTimer,
	fanModeChange,
	fetchStatusIfNecessary,
	hvacModeChange, setLocalThermostatSetPoint,
	setThermostatSetPoint
} from "../actions";

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

export const getClimateData = (rooms) => {
	if (rooms == null)
	{
		return {};
	}
	return rooms.filter(theRoom => "Climate Control" === theRoom.name).map(room => room.devices)[0].reduce((map, device) => {
		return (map[device.name] = device, map);
	}, {});
};

export const getThermostatModeStyle = deviceMap =>
{
	let aMode = deviceMap["Thermostat"].mode;
	if (aMode === "HeatOn")
	{
		return {color:"#DD531E"};
	} else if (aMode === "CoolOn")
	{
		return {color:"#0772B8"};
	}
	return {};
};

export const getCurrentOutsideTemp = deviceMap =>
{
	return deviceMap["Temperature"] != null ? deviceMap["Temperature"].temperature : 50;
};

export const getIndoorTemp = deviceMap =>
{
	return deviceMap["Thermostat"] != null ? parseInt(deviceMap["Thermostat"].temperature, 10) : 72;
};

export const getThermostatSetPoint = deviceMap =>
{
	return deviceMap["Thermostat"] != null ? deviceMap["Thermostat"].setpoint : 72;
};

export const getHumidity = deviceMap =>
{
	return deviceMap["Humidity Sensor"].humidity + "%";
};

const getFanMode = deviceMap =>
{
	return deviceMap["Thermostat"] != null ? deviceMap["Thermostat"].fanmode : "";//"Auto", "On"
};

const getMode = deviceMap =>
{
	return deviceMap["Thermostat"] != null ? deviceMap["Thermostat"].mode : "";
};

export const getFanModeStyle = (fanOption, deviceMap) =>
{
	return "btn btn-secondary w-100" + (getFanMode(deviceMap) === fanOption ? " active" : "");
};

export const getHVACStyle = (hvacValue, deviceMap) =>
{
	return "btn btn-secondary w-100" + (getMode(deviceMap) === hvacValue ? " active" : "");
};

export const getThermostatId = deviceMap =>
{
	return deviceMap["Thermostat"] != null ? deviceMap["Thermostat"].id : -1;
};
/*
const getHighTemp = deviceMap =>
{
	return deviceMap["High Temperature"].temperature;
};

const getLowTemp = deviceMap =>
{
	return deviceMap["Low Temperature"].temperature;
};*/



const mapStateToProps = state => ({
	deviceMap: getClimateData (state.house.rooms)
});

const mapDispatchToProps = dispatch => bindActionCreators({
	back: () => push('/'),
	fetchStatus: () => fetchStatusIfNecessary(),
	sliderChange: (event) => () =>
	{
		dispatch(cancelFetchTimer());
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
