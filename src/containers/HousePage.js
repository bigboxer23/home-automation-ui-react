import React from 'react';
import { connect } from 'react-redux'
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import {fetchStatusIfNecessary, sceneClicked} from '../actions'
import HousePageComponent from "../components/house/HousePageComponent";

class HousePage extends React.Component
{
	componentDidMount()
	{
		this.props.fetchStatus();
	}

	render()
	{
		return <HousePageComponent {...this.props}/>
	}
}

const getSceneRoom = (rooms) => {
	if (rooms == null)
	{
		return [];
	}
	return rooms.filter(theRoom => "Scenes" === theRoom.name).map(room => room.devices)[0];
};

const mapStateToProps = state => ({
	rooms: getSceneRoom (state.house.rooms)
});

const mapDispatchToProps = dispatch => bindActionCreators({
	back: () => push('/'),
	handleClick: (id) => sceneClicked(id, "ON"),
	fetchStatus: () => fetchStatusIfNecessary()
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(HousePage)
