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
			<div className="minor-text">{getTransitionTime(time, room.devices)}</div>
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
	const buttonText = getScene(time, scenes);
	const iconMap = {
		"Vacation Mode": "calendar",
		"PTO Mode": "calendar",
		"Evening Off": "weather-night",
		"House Off": "weather-night",
		"Evening On": "lightbulb-group-outline",
	};
	return "mdi mdi-" + (iconMap[buttonText] || "clock");
};

const getTransitionTime = (time, scenes) => {
	const scene = getScene(time, scenes);
	const transitionScene =
		scene === "Evening On" ? "vSunset_Time" : "vSunrise_Time";
	const device = time?.devices?.find((d) => d.id === transitionScene);
	const transitionTime = device?.level;
	if (!transitionTime || isNaN(new Date(transitionTime))) {
		return ""; // Or return some default like "--"
	}
	return new Date(transitionTime)
		.toLocaleTimeString([], {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		})
		.toLowerCase();
};

const getScene = (time, scenes) => {
	if (isModeActive(scenes, "Vacation Mode")) return "Vacation Mode";
	if (isModeActive(scenes, "Is PTO")) return "PTO Mode";
	if (time?.devices) {
		const deviceStatus = Object.fromEntries(
			time.devices.map((d) => [d.id, d.status]),
		);
		if (deviceStatus["IsMorning"] === "1") return "House Off";
		if (deviceStatus["IsDay"] === "1") return "Evening On";
		if (deviceStatus["IsEvening"] === "1" || deviceStatus["IsNight"] === "1")
			return "Evening Off";
	}
	return "House Off";
};

const isModeActive = (scenes, modeName) => {
	return scenes?.find((scene) => modeName === scene.name)?.level === "1";
};

export default connect(null, mapDispatchToProps)(HouseButton);
