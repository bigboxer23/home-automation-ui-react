import React from "react";
import { connect } from "react-redux";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import {
	cancelFetchTimer,
	disableAutoClose,
	fetchStatusIfNecessary,
	setDim,
	setOnOff,
} from "../actions";
import GaragePageComponent from "../components/garage/GaragePageComponent";
import GarageButton from "../components/garage/GarageButton";

class GaragePage extends React.Component {
	componentDidMount() {
		this.props.fetchStatus();
	}

	render() {
		return <GaragePageComponent {...this.props} />;
	}
}

const findGarageRoom = (rooms) => {
	if (rooms == null) {
		return { devices: [] };
	}
	return rooms.filter((theRoom) => "Garage" === theRoom.name)[0];
};

export const getHeader = (room) => {
	if (room == null) {
		return "";
	}
	let autoClose = GarageButton.getAutoClose(room);
	if (autoClose === "") {
		autoClose = "Last opened: " + GarageButton.getLastOpen(room);
	} else {
		autoClose = "Closing in: " + autoClose;
	}
	return room.name + " (" + autoClose + ")";
};

export const getAutoCloseDelay = (room) => {
	let anAutoClose = GarageButton.findGarageDevice(room)?.autoClose;
	anAutoClose = anAutoClose === undefined ? 0 : anAutoClose;
	if (anAutoClose < 600000) {
		//1000 * 60 * 10, 10m
		return 10800000; //1000 * 60 * 60 * 3// 3 hours;
	}
	return 10800000 + anAutoClose;
};

export const getAutoCloseButtonStyle = (room) => {
	return GarageButton.getAutoClose(room) === "" ? "point-events-none " : "";
};

const mapStateToProps = (state) => ({
	room: findGarageRoom(state.house.rooms),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			back: () => push("/"),
			sliderChange: (event) => (dispatch) => {
				dispatch(cancelFetchTimer());
			},
			slideStop: (level, id) => (dispatch) => {
				dispatch(setDim(level, id));
			},
			setDeviceStatus: (id, status) => (dispatch) => {
				dispatch(setOnOff(status, id));
			},
			fetchStatus: () => fetchStatusIfNecessary(),
			autoCloseClickHandler: (delay) => (dispatch) => {
				dispatch(disableAutoClose(delay));
			},
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(GaragePage);
