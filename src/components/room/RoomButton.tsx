import React from "react";
import AppButton from "../ui/AppButton";
import type { Room } from "../../types";
import {
	areDotsHidden,
	getBatteryWarningStyle,
	getButtonStyle,
	getCountContent,
	getLockedStatus,
	isOn,
} from "./RoomUtils";

interface RoomButtonProps {
	room: Room;
	handleMoreClick: (event: React.MouseEvent, name: string) => void;
	handleClick: (event: React.MouseEvent, id: string, level: number) => void;
}

export default function RoomButton({
	room,
	handleMoreClick,
	handleClick,
}: RoomButtonProps) {
	return (
		<AppButton
			onClick={(event: React.MouseEvent) => handleMoreClick(event, room.name)}
			state={getButtonStyle(room)}
			size="lg"
			className={"m-1 relative flex justify-center"}
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
			<div className="temp-display pe-1 ps-1 absolute total-lights-bg">
				{getCountContent(room)}
			</div>
			<div
				className="absolute bottom w-full m-2 ps-2 pe-4"
				onClick={(event: React.MouseEvent) =>
					handleClick(event, room.id, isOn(room) ? 0 : 100)
				}
			>
				{room.name}
			</div>
		</AppButton>
	);
}
