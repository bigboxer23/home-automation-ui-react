import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import {
	fetchStatusIfNecessary,
	setDim,
	setDimLocal,
	setOnOff,
} from "../actions";
import RoomPageComponent from "../components/room/RoomPageComponent";
import { getRoomTemp, isFan, isLight } from "../components/room/RoomUtils";
import type { AppDispatch, Device, Room, RootState } from "../types";
import { EMPTY_ROOM, findRoom } from "../utils/RoomLookup";

interface RoomPageProps {
	fetchStatus: () => void;
	room?: Room;
	rooms?: Room[];
	[key: string]: any;
}

function RoomPage(props: RoomPageProps) {
	const { fetchStatus } = props;
	useEffect(() => {
		fetchStatus();
	}, [fetchStatus]);

	return <RoomPageComponent {...(props as any)} />;
}

const filterRoom = (rooms: Room[] | null, name: string | undefined): Room => {
	const aRoom = findRoom(rooms, name ?? "");
	if (aRoom != null) {
		const devices = [...aRoom.devices].sort(
			(theDevice: Device, theDevice2: Device) => {
				if (isFan(theDevice) && !isFan(theDevice2)) {
					return -1;
				}
				if (!isFan(theDevice) && isFan(theDevice2)) {
					return 1;
				}
				if (isMotionDevice(theDevice) && !isMotionDevice(theDevice2)) {
					return 1;
				}
				if (!isMotionDevice(theDevice) && isMotionDevice(theDevice2)) {
					return -1;
				}
				if (theDevice.name < theDevice2.name) {
					return -1;
				}
				if (theDevice.name > theDevice2.name) {
					return 1;
				}
				return 0;
			},
		);
		return { ...aRoom, devices };
	}
	return EMPTY_ROOM;
};

export const getBatteryStyle = (theDevice: Device): React.CSSProperties => {
	return {
		backgroundColor: getBatteryColorFromLevel(
			parseInt(theDevice.level ?? "0", 10),
		),
	};
};

export const getBatteryContent = (theDevice: Device): string => {
	if (theDevice.level === "NULL") {
		return "Not Available";
	}
	return (theDevice.level ?? "0") + "%";
};

const getBatteryColorFromLevel = (theLevel: number): string => {
	if (theLevel === 100 || theLevel === 0) {
		return "#03902B";
	} else if (theLevel >= 90) {
		return "#2DC558";
	} else if (theLevel >= 60) {
		return "#FECF3B";
	} else if (theLevel >= 40) {
		return "#EC9800";
	} else if (theLevel >= 30) {
		return "#DD531E";
	} else if (theLevel >= 20) {
		return "#C53600";
	} else if (theLevel >= 10) {
		return "#B10909";
	}
	return "#6F0015";
};

export const isMotionDevice = (theDevice: Device): boolean => {
	return theDevice.name.endsWith("Battery");
};

export const getHeaderTitle = (
	room: Room,
	className: string = "",
): React.ReactElement => {
	const temperature = getRoomTemp(room);
	return (
		<div className={className}>
			{room.name}{" "}
			{temperature !== "" && (
				<span className="text-[0.8em] opacity-50">{temperature}</span>
			)}
		</div>
	);
};

export const getRoomDimLevel = (room: Room | null): number => {
	let level = 0;
	if (room != null) {
		room.devices
			.filter((device: Device) => device.level != null)
			.filter((device: Device) => isLight(device))
			.filter((device: Device) => !device.name.includes("Override"))
			.forEach((device: Device) => {
				level = Math.max(level, getIntegerLevel(device));
			});
	}
	return level;
};

export const getIntegerLevel = (device: Device): number => {
	return device.level === "NULL" ? 0 : parseInt(device.level ?? "0", 10);
};

const mapDispatchToProps = (dispatch: AppDispatch) =>
	bindActionCreators(
		{
			back: () => push("/"),
			sliderChange: (level: number, id: string) =>
				setDimLocal(String(level), id),
			slideStop: (level: number | string, id: string) =>
				setDim(String(level), id),
			setDeviceStatus: (id: string, status: boolean) => setOnOff(status, id),
			fetchStatus: () => fetchStatusIfNecessary(),
			handleFrontPorchClick: (id: string) => setOnOff(true, id),
		},
		dispatch,
	);

const ConnectedRoomPage = connect(
	(state: RootState, ownProps: { name?: string }) => ({
		room: filterRoom(state.house.rooms, ownProps.name),
		rooms: state.house.rooms,
	}),
	mapDispatchToProps,
)(RoomPage as any);

function RoomPageWithParams() {
	const { name } = useParams<{ name: string }>();
	return <ConnectedRoomPage name={name} />;
}

export default RoomPageWithParams;
