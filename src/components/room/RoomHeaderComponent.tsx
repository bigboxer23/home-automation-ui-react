import React from "react";
import type { Room } from "../../types";
import { getHeaderTitle, getRoomDimLevel } from "../../containers/RoomPage";
import IOSSwitch from "../ui/IOSSwitch";
import IOSSlider from "../ui/IOSSlider";

interface RoomHeaderComponentProps {
	room: Room;
	back: () => void;
	setDeviceStatus: (id: string, checked: boolean) => void;
	sliderChange: (newValue: number | number[], id: string) => void;
	slideStop: (newValue: number | number[], id: string) => void;
}

export const RoomHeaderComponent: React.FC<RoomHeaderComponentProps> = ({
	room,
	back,
	setDeviceStatus,
	sliderChange,
	slideStop,
}) => {
	const name = getHeaderTitle(room, "grow");

	return (
		<div className="header flex flex-col">
			<div className="flex items-center w-full flex-row">
				<span className="flex items-center flex-row" onClick={back}>
					<span className="mdi mdi-chevron-left mdi-36px z-1 text-black/30"></span>
					{name}
				</span>
				<div className={"grow"} />
				<IOSSwitch
					className="me-6"
					checked={getRoomDimLevel(room) > 0}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setDeviceStatus(room.id, event.target.checked)
					}
				/>
			</div>
			<div className="flex justify-center ms-4 me-4">
				{
					<IOSSlider
						value={getRoomDimLevel(room)}
						onChange={(event: Event, newValue: number | number[]) =>
							sliderChange(newValue, room.id)
						}
						onChangeCommitted={(
							event: Event | React.SyntheticEvent,
							newValue: number | number[],
						) => slideStop(newValue, room.id)}
						valueLabelDisplay={"auto"}
						min={0}
						max={100}
					/>
				}
			</div>
		</div>
	);
};
