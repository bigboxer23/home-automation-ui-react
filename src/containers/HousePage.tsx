import React from "react";
import { connect } from "react-redux";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import { fetchStatusIfNecessary, sceneClicked } from "../actions";
import HousePageComponent from "../components/house/HousePageComponent";
import type { Device, Room, RootState } from "../types";

interface HousePageProps {
	fetchStatus: () => void;
	[key: string]: any;
}

class HousePage extends React.Component<HousePageProps> {
	componentDidMount() {
		this.props.fetchStatus();
	}

	render() {
		return <HousePageComponent {...(this.props as any)} />;
	}
}

const getSceneRoom = (rooms: Room[] | null): Device[] => {
	if (rooms == null) {
		return [];
	}
	return rooms
		.filter((theRoom: Room) => "Scenes" === theRoom.name)
		.map((room: Room) => room.devices)[0];
};

const mapStateToProps = (state: RootState) => ({
	rooms: getSceneRoom(state.house.rooms),
});

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			back: () => push("/"),
			handleClick: (id: string) => sceneClicked(id, "ON"),
			fetchStatus: () => fetchStatusIfNecessary(),
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(HousePage);
