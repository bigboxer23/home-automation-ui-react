import React from "react";
import { Button } from "react-bootstrap";
import {
	areDotsHidden,
	getBatteryWarningStyle,
	getButtonStyle,
	getCountContent,
	getLockedStatus,
	isOn,
} from "./RoomUtils";
export default function RoomButton({ room, handleMoreClick, handleClick }) {
	return (
		<Button
			onClick={(event) => handleMoreClick(event, room.name)}
			variant={getButtonStyle(room)}
			size="lg"
			className={"m-1 position-relative d-flex justify-content-center"}
		>
			<i
				className={
					"mdi mdi-lightbulb-outline" +
					getBatteryWarningStyle(room) +
					getLockedStatus(room)
				}
			/>
			<i
				className={"mdi mdi-dots-horizontal inFront" + areDotsHidden(room)}
				/*onClick={(event) => handleMoreClick(event, room.name)}*/
			/>
			<div className="temp-display pe-1 ps-1 position-absolute total-lights-bg">
				{getCountContent(room)}
			</div>
			<div
				className="position-absolute bottom w-100 m-2 ps-2 pe-3"
				onClick={(event) => handleClick(event, room.id, isOn(room) ? 0 : 100)}
			>
				{room.name}
			</div>
		</Button>
	);
}
