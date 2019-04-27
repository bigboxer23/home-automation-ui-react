import React from 'react';
import { connect } from 'react-redux'
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import {
	cancelFetchTimer, fetchStatusIfNecessary, setDim, setOnOff,
} from '../actions'
import RoomPageComponent from "../components/room/RoomPageComponent";
import RoomButton from "../components/room/RoomButton";

class RoomPage extends React.Component
{
	componentDidMount()
	{
		this.props.fetchStatus();
	}

	render()
	{
		return <RoomPageComponent {...this.props}/>
	}
}

const filterRoom = (rooms, name) => {
	if (rooms == null)
	{
		return {devices:[]};
	}
	let aRoom = rooms.filter(theRoom => name === theRoom.name);
	if (aRoom.length > 0)
	{
		return aRoom[0];
	}
	return {devices:[]};
};

export const getBatteryStyle = (theDevice) =>
{
	return {backgroundColor:getBatteryColorFromLevel(parseInt(theDevice.level, 10))};
};

export const getBatteryContent = (theDevice) =>
{
	if (theDevice.level === 'NULL')
	{
		return 'Not Available';
	}
	return theDevice.level + '%';
};

const getBatteryColorFromLevel = (theLevel) =>
{
	if(theLevel === 100 || theLevel === 0)
	{
		return "#03902B";
	} else if(theLevel >= 90)
	{
		return "#2DC558";
	} else if(theLevel >= 60)
	{
		return "#FECF3B";
	} else if(theLevel >= 40)
	{
		return "#EC9800";
	} else if(theLevel >= 30)
	{
		return "#DD531E";
	} else if(theLevel >= 20)
	{
		return "#C53600";
	} else if(theLevel >= 10)
	{
		return "#B10909";
	}
	return "#6F0015";
};

export const isMotionDevice = (theDevice) =>
{
	return theDevice.name.endsWith("Battery");
};

export const getRoomDimLevel = (room) => {
	let level = 0;
	if (room != null)
	{
		room.devices
				.filter(device => device.level != null)
				.filter(device => RoomButton.isLight(device))
				.filter(device => !device.name.includes("Override"))
				.forEach(device =>
				{
					level = Math.max(level, parseInt(device.level, 10));
				});
	}
	return level;
};

const mapStateToProps = (state, props) => ({
	room: filterRoom (state.house.rooms, props.match.params.name)
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
	fetchStatus: () => fetchStatusIfNecessary()
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(RoomPage)
