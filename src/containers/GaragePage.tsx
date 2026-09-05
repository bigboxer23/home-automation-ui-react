import React from "react";
import { connect } from "react-redux";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import {
	cancelFetchTimer,
	disableAutoClose,
	fetchStatusIfNecessary,
	setDim,
	setOnOff,
} from "../actions";
import GaragePageComponent from "../components/garage/GaragePageComponent";
import GarageButton from "../components/garage/GarageButton";
import type { Room, RootState } from "../types";
import { findRoomOrEmpty } from "../utils/RoomLookup";

interface GaragePageProps {
	fetchStatus: () => void;
	[key: string]: any;
}

class GaragePage extends React.Component<GaragePageProps> {
	componentDidMount() {
		this.props.fetchStatus();
	}

	render() {
		return <GaragePageComponent {...(this.props as any)} />;
	}
}

const findGarageRoom = (rooms: Room[] | null): Room =>
	findRoomOrEmpty(rooms, "Garage");

export const getHeader = (room: Room): React.ReactNode => {
	if (room == null) {
		return "";
	}
	const autoClose = GarageButton.getAutoClose(room);
	const detail =
		autoClose === ""
			? "Last opened: " + GarageButton.getLastOpen(room)
			: "Closing in: " + autoClose;
	return (
		<div>
			{room.name} <span className="text-[0.8em] opacity-50">{detail}</span>
		</div>
	);
};

export const getAutoCloseDelay = (room: Room): number => {
	let anAutoClose = GarageButton.findGarageDevice(room)?.autoClose;
	anAutoClose = anAutoClose === undefined ? 0 : anAutoClose;
	if (anAutoClose < 600000) {
		//1000 * 60 * 10, 10m
		return 10800000; //1000 * 60 * 60 * 3// 3 hours;
	}
	return 10800000 + anAutoClose;
};

export const getAutoCloseButtonStyle = (room: Room): string => {
	return GarageButton.getAutoClose(room) === "" ? "pointer-events-none " : "";
};

const mapStateToProps = (state: RootState) => ({
	room: findGarageRoom(state.house.rooms),
});

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			back: () => push("/"),
			sliderChange: (event: any) => (dispatch: any) => {
				dispatch(cancelFetchTimer());
			},
			slideStop: (level: number, id: string) => (dispatch: any) => {
				dispatch(setDim(String(level), id));
			},
			setDeviceStatus: (id: string, status: boolean) => (dispatch: any) => {
				dispatch(setOnOff(status, id));
			},
			fetchStatus: () => fetchStatusIfNecessary(),
			autoCloseClickHandler: (delay: number) => (dispatch: any) => {
				dispatch(disableAutoClose(delay));
			},
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(GaragePage);
