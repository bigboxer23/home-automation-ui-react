import React from 'react';
import { connect } from 'react-redux'
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import ClimatePageComponent from "../components/ClimatePageComponent";
import {fanModeChange, fetchStatusIfNecessary, hvacModeChange, requestStatus, statusUpdated} from "../actions";

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

export const getCurrentTemp = deviceMap =>
{
	return deviceMap["Temperature"].temperature;
};

export const getIndoorTemp = deviceMap =>
{
	return deviceMap["Thermostat"] != null ? parseInt(deviceMap["Thermostat"].temperature, 10) : 72;
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

const getHighTemp = deviceMap =>
{
	return deviceMap["High Temperature"].temperature;
};

const getLowTemp = deviceMap =>
{
	return deviceMap["Low Temperature"].temperature;
};



const mapStateToProps = state => ({
	deviceMap: getClimateData (state.house.rooms)
});

const mapDispatchToProps = dispatch => bindActionCreators({
	back: () => push('/'),
	fetchStatus: () => fetchStatusIfNecessary(),
	sliderChange: (event) => (getState) =>
	{
		console.log("slider: " + event.target.value);
		//console.log("trigger scene: " + id);
		/*dispatch(requestStatus());
		fetch("S/Vera/Scene/" + id + "/HomeAutomationGateway1&action=RunScene").finally(() => {
			dispatch(statusUpdated(getState().house.rooms));
		});*/
	},
	fanModeChange: (value, id) => fanModeChange(value, id),
	hvacModeChange: (value, id) => hvacModeChange(value, id)
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ClimatePage)
