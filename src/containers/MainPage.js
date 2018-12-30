import { connect } from 'react-redux'
import {
	fetchStatusIfNecessary,
	garageClicked,
	roomClicked,
} from '../actions'
import MainPageComponent from "../components/MainPageComponent";
import React from "react";
import RoomButton from "../components/room/RoomButton"
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import LoadingStatusComponent from "../components/LoadingStatusComponent";

class MainPage extends React.Component
{
	componentDidMount()
	{
		this.props.fetchStatus();
	}

	render()
	{
		return <div><LoadingStatusComponent {...this.props}/><MainPageComponent {...this.props}/></div>
	}
}

const getRooms = (rooms) => {
	if (rooms == null)
	{
		return [];
	}
	let allItems = rooms.filter(theRoom => shouldDisplay(theRoom))
			.sort((theRoom, theRoom2) =>
			{
				if(theRoom.name < theRoom2.name) { return -1; }
				if(theRoom.name > theRoom2.name) { return 1; }
				return 0;
			});
	let aScenes = allItems.filter(theRoom => "Scenes" === theRoom.name);
	aScenes[0].totalLights = countTotalLights(rooms);
	return allItems.filter(theRoom => "Climate" === theRoom.name)
			.concat(allItems.filter(theRoom => "Garage" === theRoom.name))
			.concat(aScenes)
			.concat(allItems.filter(theRoom => "Garage" !== theRoom.name && "Climate" !== theRoom.name && "Scenes" !== theRoom.name));
};

const countTotalLights = function (rooms)
{
	let aLightCount = 0;
	rooms.forEach(room =>
	{
		if (hasLights(room) && "Scenes" !== room.name)
		{
			aLightCount += RoomButton.onCount(room)
		}
	});
	return aLightCount === 0 ? "" : aLightCount;
};

const shouldDisplay = function(theRoom)
{
	return (hasLights(theRoom) || theRoom.name === "Climate" || theRoom.name === "Scenes");
};

const hasLights = function(theRoom)
{
	return theRoom.devices != null && theRoom.devices.filter(theDevice => RoomButton.isLight(theDevice)).length > 0;
};

const mapStateToProps = state => ({
	rooms: getRooms (state.house.rooms),
	loaded: state.house.lastUpdate,
	authError: state.house.authError
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