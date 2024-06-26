import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";
import { sceneClicked } from "../../actions";

const HouseButton = ({ room, time, changePage, houseOff }) => (
	<Button
		onClick={(event) => changePage(event)}
		variant=""
		size="lg"
		className={
			"m-1 position-relative d-flex justify-content-center house-button"
		}
	>
		<i className={getButtonStyling(time, room.devices)} />
		<div className="temp-display pe-1 ps-1 position-absolute total-lights-bg">
			{room.totalLights}
		</div>
		<div
			className="position-absolute bottom w-100 m-2 ps-2 pe-2"
			onClick={(event) => houseOff(event, time, room.devices)}
		>
			{getScene(time, room.devices)}
		</div>
	</Button>
);

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			changePage: (event) => (dispatch) => {
				event.stopPropagation();
				dispatch(push("/Scenes"));
			},
			houseOff: (event, time, scenes) => {
				event.stopPropagation();
				let aScene = getScene(time, scenes);
				return sceneClicked(
					aScene.replace(" Off", "").replace(" On", ""),
					aScene.indexOf(" Off") > -1 ? "OFF" : "ON",
				);
			},
		},
		dispatch,
	);

const getButtonStyling = (time, scenes) => {
	let aButtonText = getScene(time, scenes);
	let aPrefix = "mdi mdi-";
	switch (aButtonText) {
		case "Vacation Mode":
			return aPrefix + "calendar";
		case "Evening Off":
		case "House Off":
			return aPrefix + "weather-night";
		case "Evening On":
			return aPrefix + "lightbulb-group-outline";
		default:
			return aPrefix + "clock";
	}
};

const getScene = (time, scenes) => {
	if (isVacationMode(scenes)) {
		return "Vacation Mode";
	}
	if (time != null) {
		if (
			time.devices.find((theDevice) => "IsMorning" === theDevice.id).status ===
			"1"
		) {
			return "House Off";
		} else if (
			time.devices.find((theDevice) => "IsDay" === theDevice.id).status === "1"
		) {
			return "Evening On";
		} else if (
			time.devices.find((theDevice) => "IsEvening" === theDevice.id).status ===
				"1" ||
			time.devices.find((theDevice) => "IsNight" === theDevice.id).status ===
				"1"
		) {
			return "Evening Off";
		}
	}
	return "House Off";
};

const isVacationMode = (scenes) => {
	return scenes?.find((scene) => "Vacation Mode" === scene.name)?.level === "1";
};

export default connect(null, mapDispatchToProps)(HouseButton);
