import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { fetchStatusIfNecessary, sceneClicked, setMeuralOn } from "../actions";
import MeuralPageComponent from "../components/meural/MeuralPageComponent";

class MeuralPage extends React.Component {
	render() {
		return <MeuralPageComponent {...this.props} />;
	}

	componentDidMount() {
		this.props.fetchStatus();
	}
}

export const mapStateToProps = (state) => ({
	device: findMeuralDeviceFromRooms(state.house.rooms),
});

const findMeuralDeviceFromRooms = (rooms) => {
	return findMeuralDeviceFromRoom(
		rooms?.find((theRoom) => "Meural" === theRoom.name)
	);
};

export const findMeuralDeviceFromRoom = (room) => {
	return room?.devices?.find((device) => "Meural" === device.name);
};

export const getOnOffText = (devices) => {
	return isOn(devices) ? "Turn Off" : "Turn On";
};

export const isOn = (device) => {
	return "1.0" === device?.level;
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			back: () => push("/"),
			fetchStatus: () => fetchStatusIfNecessary(),
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(MeuralPage);
