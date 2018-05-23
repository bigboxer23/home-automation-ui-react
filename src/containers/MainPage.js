import { connect } from 'react-redux'
import {
	fetchStatusIfNecessary,
	garageClicked,
	roomClicked,
} from '../actions'
import MainPageComponent from "../components/MainPageComponent";
import React from "react";
import RoomButton from "../components/RoomButton"
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";

class MainPage extends React.Component
{
	componentDidMount()
	{
		this.props.fetchStatus();
	}

	render()
	{
		return <MainPageComponent {...this.props}/>
	}
}

const getRooms = (rooms) => {
	if (rooms == null)
	{
		return [];
	}
	let allItems = rooms.filter(theRoom => shouldDisplay(theRoom));
	return allItems.filter(theRoom => "Climate Control" === theRoom.name)
			.concat(allItems.filter(theRoom => "Garage" === theRoom.name))
			.concat(allItems.filter(theRoom => "Scenes" === theRoom.name))
			.concat(allItems.filter(theRoom => "Garage" !== theRoom.name && "Climate Control" !== theRoom.name && "Scenes" !== theRoom.name));
};

const shouldDisplay = function(theRoom)
{
	return (hasLights(theRoom) || theRoom.name === "Climate Control" || theRoom.name === "Scenes");
};

const hasLights = function(theRoom)
{
	return theRoom.devices != null && theRoom.devices.filter(theDevice => RoomButton.isLight(theDevice)).length > 0;
};

const mapStateToProps = state => ({
	rooms: getRooms (state.house.rooms)
});

const mapDispatchToProps = dispatch => bindActionCreators({
	handleClick: (id, state) => (dispatch, getState) =>
	{
		dispatch(roomClicked(id, state))
	},
	fetchStatus: () => (dispatch, getState) =>
	{
		dispatch(fetchStatusIfNecessary());
	},
	handleGarageClick: (action) => (dispatch, getState) =>
	{
		dispatch(garageClicked(action));
	},
	handleMoreClick: (event, name) => (dispatch, getState) =>
	{
		event.stopPropagation();
		dispatch(push('/Room/' + name));
	},
	handleGarageMoreClick : (event) => (dispatch, getState) =>
	{
		event.stopPropagation();
		dispatch(push('/Garage'));
	}
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(MainPage)