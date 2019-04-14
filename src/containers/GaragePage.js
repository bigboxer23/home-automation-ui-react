import React from 'react';
import { connect } from 'react-redux'
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import {cancelFetchTimer, disableAutoClose, enableAutoClose, fetchStatusIfNecessary, setDim, setOnOff} from '../actions'
import GaragePageComponent from "../components/garage/GaragePageComponent";
import GarageButton from "../components/garage/GarageButton";

class GaragePage extends React.Component
{
	componentDidMount()
	{
		this.props.fetchStatus();
	}

	render()
	{
		return <GaragePageComponent {...this.props}/>
	}
}

const findGarageRoom = (rooms) => {
	if (rooms == null)
	{
		return {devices:[]};
	}
	return rooms.filter(theRoom => "Garage" === theRoom.name)[0];
};

export const getHeader = (room) =>
{
	if (room == null)
	{
		return "";
	}
	let anAutoClose = GarageButton.getAutoClose(room);
	if (anAutoClose !== "")
	{
		anAutoClose = " - " + anAutoClose;
	}
	return room.name + anAutoClose;
};

export const getAutoCloseButtonText = (room) =>
{
	let anAutoClose = GarageButton.getAutoClose(room);
	if (anAutoClose === "")
	{
		return "Disable Auto Close";
	}
	anAutoClose = GarageButton.findGarageDevice(room).autoClose;
	if (anAutoClose > 10 * 60 * 1000)
	{
		return "Enable Auto Close";
	}
	return "Disable Auto Close";
};

export const getAutoCloseButtonStyle = (room) =>
{
	return GarageButton.getAutoClose(room) === "" ? "point-events-none " : "";
};

const mapStateToProps = state => ({
	room: findGarageRoom (state.house.rooms)
});

const mapDispatchToProps = dispatch => bindActionCreators({
	back: () => push('/'),
	sliderChange: (event) => (dispatch) =>
	{
		dispatch(cancelFetchTimer());
	},
	slideStop: (level, id) => (dispatch) =>
	{
		dispatch(setDim(level, id));
	},
	setDeviceStatus: (id, status) => (dispatch) =>
	{
		dispatch(setOnOff(status, id));
	},
	fetchStatus: () => fetchStatusIfNecessary(),
	autoCloseClickHandler: (status) => (dispatch) =>
	{
		dispatch(status === "Disable Auto Close" ? disableAutoClose() : enableAutoClose());
	}
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(GaragePage)
