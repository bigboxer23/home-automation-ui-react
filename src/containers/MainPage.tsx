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
import type { Room, RootState, Device } from "../types";

interface MainPageProps {
	fetchStatus: () => void;
	[key: string]: any;
}

class MainPage extends React.Component<MainPageProps> {
	componentDidMount() {
		this.props.fetchStatus();
	}

	render() {
		return (
			<div>
				<LoadingStatusComponent {...(this.props as any)} />
				<MainPageComponent {...(this.props as any)} />
			</div>
		);
	}
}
const getTime = (rooms: Room[]): Room | undefined => {
	return rooms?.find((room: Room) => "Time" === room.name);
};

const getRooms = (rooms: Room[]): Room[] => {
	if (rooms == null) {
		return [];
	}
	let allItems = rooms
		.filter((room: Room) => shouldDisplay(room))
		.sort((room: Room, room2: Room) => {
			if (room.name < room2.name) {
				return -1;
			}
			if (room.name > room2.name) {
				return 1;
			}
			return 0;
		});
	const scenes = allItems.find((room: Room) => "Scenes" === room.name);
	if (scenes == null) {
		return allItems;
	}
	scenes.totalLights = countTotalLights(rooms);
	return allItems
		.filter((room: Room) => "Climate" === room.name)
		.concat(allItems.filter((room: Room) => "Garage" === room.name))
		.concat(scenes)
		.concat(allItems.filter((room: Room) => "Meural" === room.name))
		.concat(
			allItems.filter(
				(room: Room) =>
					"Garage" !== room.name &&
					"Climate" !== room.name &&
					"Scenes" !== room.name &&
					"Time" !== room.name &&
					"Meural" !== room.name &&
					"Front Porch Color" !== room.name,
			),
		);
};

const countTotalLights = function (rooms: Room[]): number {
	let aLightCount = 0;
	rooms.forEach((room: Room) => {
		if (hasLights(room) && "Scenes" !== room.name) {
			aLightCount += onCount(room);
		}
	});
	return aLightCount;
};

const shouldDisplay = function (room: Room): boolean {
	return (
		(hasLights(room) ||
			room.name === "Climate" ||
			room.name === "Scenes" ||
			room.name === "Meural") &&
		room.name !== "Front Porch Colors"
	);
};

const hasLights = function (room: Room): boolean {
	return (
		room.devices != null &&
		room.devices.filter((theDevice: Device) => isLight(theDevice)).length > 0
	);
};

export const mapRoom = function (
	time: Room | undefined,
	room: Room,
	handleClick: (
		event: React.MouseEvent,
		id: string,
		state: string | number,
	) => void,
	handleGarageClick: (action: string) => void,
	handleMoreClick: (event: React.MouseEvent, name: string) => void,
	handleGarageMoreClick: (event: React.MouseEvent) => void,
): React.ReactElement {
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
		return <ClimateButton key={room.name} />;
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

const mapStateToProps = (state: RootState) => ({
	rooms: getRooms(state.house.rooms),
	time: getTime(state.house.rooms),
	loaded: state.house.lastUpdate,
	authError: state.house.authError,
});

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			handleClick:
				(event: React.MouseEvent, id: string, state: string) =>
				(dispatch: any) => {
					event.stopPropagation();
					dispatch(roomClicked(id, state));
				},
			fetchStatus: () => (dispatch: any) => {
				dispatch(fetchStatusIfNecessary());
			},
			handleGarageClick: (action: string) => (dispatch: any) => {
				dispatch(garageClicked(action));
			},
			handleMoreClick:
				(event: React.MouseEvent, name: string) => (dispatch: any) => {
					event.stopPropagation();
					dispatch(push("/Room/" + name));
				},
			handleGarageMoreClick: (event: React.MouseEvent) => (dispatch: any) => {
				event.stopPropagation();
				dispatch(push("/Garage"));
			},
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
