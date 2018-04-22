import React from 'react';
import { connect } from 'react-redux'
import ScenePageComponent from "../components/ScenePageComponent";
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

const getRooms = (rooms) => {
	if (rooms == null)
	{
		return [];
	}
	return rooms.filter(theRoom => "Scenes" === theRoom.name).map(room => room.scenes)[0];
};

const mapStateToProps = state => ({
	rooms: getRooms (state.house.rooms)
});

const mapDispatchToProps = dispatch => bindActionCreators({
	back: () => push('/'),
	handleClick: (id) => sceneClicked(id),
	fetchStatus: () => fetchStatusIfNecessary()
}, dispatch);

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ScenePage)
