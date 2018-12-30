import React from 'react';
import { connect } from 'react-redux'
import ScenePageComponent from "../components/scene/ScenePageComponent";
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import {fetchStatusIfNecessary, sceneClicked} from '../actions'

class ScenePage extends React.Component
{
	componentDidMount()
	{
		this.props.fetchStatus();
	}

	render()
	{
		return <ScenePageComponent {...this.props}/>
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
)(ScenePage)
