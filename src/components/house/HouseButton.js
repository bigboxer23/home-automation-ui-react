import React from "react";
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import {sceneClicked} from "../../actions";

const HouseButton = props => (
		<Button onClick={() => props.houseOff(props.room.devices)} bsStyle={"default"} bsSize="large" className={"m-1 position-relative d-flex justify-content-center house-button"}>
			<i className={getButtonStyling(props.room.devices)}/>
			<div className="temp-display pr-1 pl-1 position-absolute total-lights-bg" onClick={(event) => props.changePage(event)}>{props.room.totalLights}</div>
			<div className="position-absolute bottom w-100 m-2 pl-2 pr-2">{getButtonText(props.room.devices)}</div>
		</Button>
);

const mapDispatchToProps = dispatch => bindActionCreators({
	changePage: (event) => (dispatch) =>
	{
		event.stopPropagation();
		dispatch(push('/Scenes'));
	},
	houseOff: (scenes) => sceneClicked(isVacationMode(scenes) ? "VacationMode" : (isNight() ? "Evening" : "Morning"), "OFF")
}, dispatch);

const getButtonStyling = (scenes) =>
{
	return "mdi " + (isVacationMode(scenes) ? "mdi-calendar" : isNight() ? "mdi-weather-night" : "mdi-clock");
};

const getButtonText = (scenes) =>
{
	return isVacationMode(scenes) ? "Vacation Mode" : isNight() ? "Evening Off" : "House Off";
};

const isNight = () => new Date().getHours() >= 20 || new Date().getHours() < 7;

const isVacationMode = (scenes) => {
	if (scenes == null)
	{
		return false;
	}
	let aVacation = scenes.find(scene => scene.name === "Vacation Mode");
	return aVacation != null ? aVacation.level === "1" : false;
};

export default connect(
		null,
		mapDispatchToProps
)(HouseButton)