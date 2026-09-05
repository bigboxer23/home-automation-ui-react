import React from "react";
import { connect } from "react-redux";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import { fetchStatusIfNecessary, sceneClicked } from "../actions";
import HousePageComponent from "../components/house/HousePageComponent";
import type { AppDispatch, Device, Room, RootState } from "../types";
import { findRoomDevices } from "../utils/RoomLookup";

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

const getSceneRoom = (rooms: Room[] | null): Device[] =>
	findRoomDevices(rooms, "Scenes");

const mapStateToProps = (state: RootState) => ({
	rooms: getSceneRoom(state.house.rooms),
});

const mapDispatchToProps = (dispatch: AppDispatch) =>
	bindActionCreators(
		{
			back: () => push("/"),
			handleClick: (id: string) => sceneClicked(id, "ON"),
			fetchStatus: () => fetchStatusIfNecessary(),
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(HousePage);
