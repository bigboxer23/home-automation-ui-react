import React from "react";
import { connect } from "react-redux";
import ScenePageComponent from "../components/scene/ScenePageComponent";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { fetchStatusIfNecessary, sceneClicked } from "../actions";

class ScenePage extends React.Component {
	componentDidMount() {
		this.props.fetchStatus();
	}

	render() {
		return <ScenePageComponent {...this.props} />;
	}
}

const getSceneRoom = (rooms) => {
	if (rooms == null) {
		return [];
	}
	return rooms
		.filter((theRoom) => "Scenes" === theRoom.name)
		.map((room) => room.devices)[0];
};

const mapStateToProps = (state) => ({
	rooms: getSceneRoom(state.house.rooms),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			back: () => push("/"),
			handleClick: (id, state) => sceneClicked(id, state),
			fetchStatus: () => fetchStatusIfNecessary(),
			gotoSecurity: () => push("Security"),
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(ScenePage);
