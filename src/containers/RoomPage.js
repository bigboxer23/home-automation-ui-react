import React from 'react';
import { connect } from 'react-redux'
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import {
	cancelFetchTimer, fetchStatusIfNecessary, setDim, setOnOff,
} from '../actions'
import RoomPageComponent from "../components/RoomPageComponent";

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

const mapStateToProps = (state, props) => ({
	room: filterRoom (state.house.rooms, props.match.params.name)
});

const mapDispatchToProps = dispatch => bindActionCreators({
	back: () => push('/'),
	sliderChange: (event) => (dispatch) =>
	{
		dispatch(cancelFetchTimer());
	},
	slideStop: (level, id, subject) => (dispatch) =>
	{
		dispatch(setDim(level, id, subject));
	},
	setDeviceStatus: (id, status) => (dispatch) =>
	{
		dispatch(cancelFetchTimer());
		dispatch(setOnOff(status, id, "Device"));
	},
	fetchStatus: () => fetchStatusIfNecessary()
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(RoomPage)
