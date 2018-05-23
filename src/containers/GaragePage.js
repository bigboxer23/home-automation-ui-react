import React from 'react';
import { connect } from 'react-redux'
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import {fetchStatusIfNecessary, sceneClicked} from '../actions'
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
	return rooms == null ? null : rooms.filter(theRoom => "Garage" === theRoom.name)[0];
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

const mapStateToProps = state => ({
	room: findGarageRoom (state.house.rooms)
});

const mapDispatchToProps = dispatch => bindActionCreators({
	back: () => push('/'),
	handleClick: (id) => sceneClicked(id),
	fetchStatus: () => fetchStatusIfNecessary()
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(GaragePage)
