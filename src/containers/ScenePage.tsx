import React from "react";
import { connect } from "react-redux";
import ScenePageComponent from "../components/scene/ScenePageComponent";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import { fetchStatusIfNecessary, sceneClicked } from "../actions";
import type { Device, Room, RootState } from "../types";

interface ScenePageProps {
	fetchStatus: () => void;
	[key: string]: any;
}

class ScenePage extends React.Component<ScenePageProps> {
	componentDidMount() {
		this.props.fetchStatus();
	}

	render() {
		return <ScenePageComponent {...(this.props as any)} />;
	}
}

const getSceneRoom = (rooms: Room[] | null): Device[] => {
	if (rooms == null) {
		return [];
	}
	const scenesRoom = rooms
		.filter((theRoom: Room) => "Scenes" === theRoom.name)
		.map((room: Room) => room.devices)[0];
	return scenesRoom || [];
};

const mapStateToProps = (state: RootState) => ({
	rooms: getSceneRoom(state.house.rooms),
});

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			back: () => push("/"),
			handleClick: (id: string, state: string) => sceneClicked(id, state),
			fetchStatus: () => fetchStatusIfNecessary(),
			gotoPage: (where: string) => push(where),
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(ScenePage);
