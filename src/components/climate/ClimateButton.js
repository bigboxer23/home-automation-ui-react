import React from "react";
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import {
	getClimateData,
	getCurrentOutsideTemp, getHumidity,
	getIndoorTemp,
	getThermostatModeStyle
} from "../containers/ClimatePage";
import {getFormattedTemp, getTempStyle} from "./WeatherUtilities";

const ClimateButton = props => (
		<Button onClick={() => props.changePage()} bsStyle={"default"} bsSize="large" className={"m-2 position-relative d-flex justify-content-center"}>
			<i className="mdi mdi-thermometer-lines" style={getThermostatModeStyle(props.deviceMap)}></i>
			<div className="tempDisplay pr-1 pl-1 position-absolute" style={getTempStyle(getCurrentOutsideTemp(props.deviceMap))}>{getFormattedTemp(getCurrentOutsideTemp(props.deviceMap))}</div>
			<div className="position-absolute bottom w-100 m-2 pl-2 pr-2"><div className="currentTemp">{getFormattedTemp(getIndoorTemp(props.deviceMap))}/{getHumidity(props.deviceMap)}</div>
				Climate</div>
		</Button>
);

const mapStateToProps = state => ({
	deviceMap: getClimateData (state.house.rooms)
});

const mapDispatchToProps = dispatch => bindActionCreators({
	changePage: () => push('/Climate')
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ClimateButton)