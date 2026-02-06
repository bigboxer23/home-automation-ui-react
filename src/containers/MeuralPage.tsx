import React from "react";
import { connect } from "react-redux";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import { fetchStatusIfNecessary, sceneClicked, setMeuralOn } from "../actions";
import MeuralPageComponent from "../components/meural/MeuralPageComponent";
import type { Device, Room, RootState } from "../types";

interface MeuralPageProps {
	fetchStatus: () => void;
	[key: string]: any;
}

class MeuralPage extends React.Component<MeuralPageProps> {
	render() {
		return <MeuralPageComponent {...(this.props as any)} />;
	}

	componentDidMount() {
		this.props.fetchStatus();
	}
}

export const mapStateToProps = (state: RootState) => ({
	device: findMeuralDeviceFromRooms(state.house.rooms),
});

const findMeuralDeviceFromRooms = (rooms: Room[]): Device | undefined => {
	return findMeuralDeviceFromRoom(
		rooms?.find((theRoom: Room) => "Meural" === theRoom.name),
	);
};

export const findMeuralDeviceFromRoom = (
	room: Room | undefined,
): Device | undefined => {
	return room?.devices?.find((device: Device) => "Meural" === device.name);
};

export const getOnOffText = (devices: Device | undefined): string => {
	return isOn(devices) ? "Turn Off" : "Turn On";
};

export const isOn = (device: Device | undefined): boolean => {
	return "1.0" === device?.level;
};

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			back: () => push("/"),
			fetchStatus: () => fetchStatusIfNecessary(),
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(MeuralPage);
