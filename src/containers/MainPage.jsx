import { connect } from "react-redux";
import { fetchStatusIfNecessary, garageClicked, roomClicked } from "../actions";
import MainPageComponent from "../components/MainPageComponent";
import React from "react";
import RoomButton from "../components/room/RoomButton";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import LoadingStatusComponent from "../components/LoadingStatusComponent";
import GarageButton from "../components/garage/GarageButton";
import ClimateButton from "../components/climate/ClimateButton";
import HouseButton from "../components/house/HouseButton";
import MeuralButton from "../components/meural/MeuralButton";
import { isLight, onCount } from "../components/room/RoomUtils";

class MainPage extends React.Component {
	componentDidMount() {
		this.props.fetchStatus();
	}

	render() {
		return (
			<div>
				<LoadingStatusComponent {...this.props} />
				<MainPageComponent {...this.props} />
			</div>
		);
	}
}
const getTime = (rooms) => {
	return rooms?.find((room) => "Time" === room.name);
};

const getRooms = (rooms) => {
	if (rooms == null) {
		return [];
	}
	let allItems = rooms
		.filter((room) => shouldDisplay(room))
		.sort((room, room2) => {
			if (room.name < room2.name) {
				return -1;
			}
			if (room.name > room2.name) {
				return 1;
			}
			return 0;
		});
	const aScenes = allItems.find((room) => "Scenes" === room.name);
	aScenes.totalLights = countTotalLights(rooms);
	return allItems
		.filter((room) => "Climate" === room.name)
		.concat(allItems.filter((room) => "Garage" === room.name))
		.concat(aScenes)
		.concat(allItems.filter((room) => "Meural" === room.name))
		.concat(
			allItems.filter(
				(room) =>
					"Garage" !== room.name &&
					"Climate" !== room.name &&
					"Scenes" !== room.name &&
					"Time" !== room.name &&
					"Meural" !== room.name &&
					"Front Porch Color" !== room.name,
			),
		);
};

const countTotalLights = function (rooms) {
	let aLightCount = 0;
	rooms.forEach((room) => {
		if (hasLights(room) && "Scenes" !== room.name) {
			aLightCount += onCount(room);
		}
	});
	return aLightCount;
};

const shouldDisplay = function (room) {
	return (
		(hasLights(room) ||
			room.name === "Climate" ||
			room.name === "Scenes" ||
			room.name === "Meural") &&
		room.name !== "Front Porch Colors"
	);
};

const hasLights = function (room) {
	return (
		room.devices != null &&
		room.devices.filter((theDevice) => isLight(theDevice)).length > 0
	);
};

export const mapRoom = function (
	time,
	room,
	handleClick,
	handleGarageClick,
	handleMoreClick,
	handleGarageMoreClick,
) {
	if ("Garage" === room.name) {
		return (
			<GarageButton
				key={room.name}
				room={room}
				handleGarageClick={handleGarageClick}
				handleGarageMoreClick={handleGarageMoreClick}
			/>
		);
	} else if ("Climate" === room.name) {
		return (
			<ClimateButton key={room.name} room={room} handleClick={handleClick} />
		);
	} else if ("Scenes" === room.name) {
		return <HouseButton key={room.name} room={room} time={time} />;
	} else if ("Meural" === room.name) {
		return <MeuralButton key={room.name} room={room} />;
	}
	return (
		<RoomButton
			key={room.name}
			room={room}
			handleClick={handleClick}
			handleMoreClick={handleMoreClick}
		/>
	);
};

const mapStateToProps = (state) => ({
	rooms: getRooms(state.house.rooms),
	time: getTime(state.house.rooms),
	loaded: state.house.lastUpdate,
	authError: state.house.authError,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			handleClick: (event, id, state) => (dispatch) => {
				event.stopPropagation();
				dispatch(roomClicked(id, state));
			},
			fetchStatus: () => (dispatch) => {
				dispatch(fetchStatusIfNecessary());
			},
			handleGarageClick: (action) => (dispatch) => {
				dispatch(garageClicked(action));
			},
			handleMoreClick: (event, name) => (dispatch) => {
				event.stopPropagation();
				dispatch(push("/Room/" + name));
			},
			handleGarageMoreClick: (event) => (dispatch) => {
				event.stopPropagation();
				dispatch(push("/Garage"));
			},
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
