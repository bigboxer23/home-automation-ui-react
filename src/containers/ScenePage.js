import React, { Component } from 'react';
import { connect } from 'react-redux'
import ScenePageComponent from "../components/ScenePageComponent";
import RoomButton from "../components/RoomButton";
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";

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
		return (hasLights(theRoom) || theRoom.name === "Climate Control" || theRoom.name === "Scenes"/*(theRoom.scenes != null && theRoom.scenes.length > 0)*/);
	};

	const hasLights = function(theRoom)
	{
		return theRoom.devices != null && theRoom.devices.filter(theDevice => RoomButton.isLight(theDevice)).length > 0;
	};

	const mapStateToProps = state => ({
		rooms: getRooms (state.house.rooms)
	});

const mapDispatchToProps = dispatch => bindActionCreators({
	back: () => push('/')
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ScenePageComponent)
