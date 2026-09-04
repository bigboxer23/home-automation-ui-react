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
					"mdi tile-icon mdi-lightbulb-outline [[data-state=on]_&]:text-bulb" +
					getBatteryWarningStyle(room) +
					getLockedStatus(room)
				}
			/>
			<i
				className={
					"mdi mdi-dots-horizontal z-1 absolute top-0 right-0 w-[50px] h-[50px] text-[32px] leading-[32px] opacity-30" +
					areDotsHidden(room)
				}
				/*onClick={(event) => handleMoreClick(event, room.name)}*/
			/>
			<div className="rounded-lg text-white right-2 top-2 min-w-8.75 flex justify-center pe-1 ps-1 absolute bg-black/30">
				{getCountContent(room)}
			</div>
			<div
				className="absolute bottom-0 w-full m-2 ps-2 pe-4"
				onClick={(event: React.MouseEvent) =>
					handleClick(event, room.id, isOn(room) ? 0 : 100)
				}
			>
				{room.name}
			</div>
		</AppButton>
	);
}
