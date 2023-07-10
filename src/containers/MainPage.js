import { connect } from "react-redux";
import { fetchStatusIfNecessary, garageClicked, roomClicked } from "../actions";
import MainPageComponent from "../components/MainPageComponent";
import React from "react";
import RoomButton from "../components/room/RoomButton";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import LoadingStatusComponent from "../components/LoadingStatusComponent";
import GarageButton from "../components/garage/GarageButton";
import ClimateButton from "../components/climate/ClimateButton";
import HouseButton from "../components/house/HouseButton";
import MeuralButton from "../components/meural/MeuralButton";

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
	return rooms?.find((theRoom) => "Time" === theRoom.name);
};

const getRooms = (rooms) => {
	if (rooms == null) {
		return [];
	}
	let allItems = rooms
		.filter((theRoom) => shouldDisplay(theRoom))
		.sort((theRoom, theRoom2) => {
			if (theRoom.name < theRoom2.name) {
				return -1;
			}
			if (theRoom.name > theRoom2.name) {
				return 1;
			}
			return 0;
		});
	const aScenes = allItems.find((theRoom) => "Scenes" === theRoom.name);
	aScenes.totalLights = countTotalLights(rooms);
	return allItems
		.filter((theRoom) => "Climate" === theRoom.name)
		.concat(allItems.filter((theRoom) => "Garage" === theRoom.name))
		.concat(aScenes)
		.concat(allItems.filter((theRoom) => "Meural" === theRoom.name))
		.concat(
			allItems.filter(
				(theRoom) =>
					"Garage" !== theRoom.name &&
					"Climate" !== theRoom.name &&
					"Scenes" !== theRoom.name &&
					"Time" !== theRoom.name &&
					"Meural" !== theRoom.name,
			),
		);
};

const countTotalLights = function (rooms) {
	let aLightCount = 0;
	rooms.forEach((room) => {
		if (hasLights(room) && "Scenes" !== room.name) {
			aLightCount += RoomButton.onCount(room);
		}
	});
	return aLightCount;
};

const shouldDisplay = function (theRoom) {
	return (
		hasLights(theRoom) ||
		theRoom.name === "Climate" ||
		theRoom.name === "Scenes" ||
		theRoom.name === "Meural"
	);
};

const hasLights = function (theRoom) {
	return (
		theRoom.devices != null &&
		theRoom.devices.filter((theDevice) => RoomButton.isLight(theDevice))
			.length > 0
	);
};

export const mapRoom = function (
	theTime,
	theRoom,
	handleClick,
	handleGarageClick,
	handleMoreClick,
	handleGarageMoreClick,
) {
	if ("Garage" === theRoom.name) {
		return (
			<GarageButton
				key={theRoom.name}
				room={theRoom}
				handleGarageClick={handleGarageClick}
				handleGarageMoreClick={handleGarageMoreClick}
			/>
		);
	} else if ("Climate" === theRoom.name) {
		return (
			<ClimateButton
				key={theRoom.name}
				room={theRoom}
				handleClick={handleClick}
			/>
		);
	} else if ("Scenes" === theRoom.name) {
		return <HouseButton key={theRoom.name} room={theRoom} time={theTime} />;
	} else if ("Meural" === theRoom.name) {
		return <MeuralButton key={theRoom.name} room={theRoom} />;
	}
	return (
		<RoomButton
			key={theRoom.name}
			room={theRoom}
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
			handleClick: (id, state) => (dispatch) => {
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
