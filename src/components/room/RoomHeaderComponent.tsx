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
	const name = getHeaderTitle(room, "flex-grow-1");

	return (
		<div className="header d-flex flex-column">
			<div className="d-flex align-items-center w-100 flex-row">
				<span className="d-flex align-items-center flex-row" onClick={back}>
					<span className="mdi mdi-chevron-left mdi-36px z-index-1 "></span>
					{name}
				</span>
				<div className={"flex-grow-1"} />
				<IOSSwitch
					className="me-4"
					checked={getRoomDimLevel(room) > 0}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setDeviceStatus(room.id, event.target.checked)
					}
				/>
			</div>
			<div className="d-flex btn-group btn-group-toggle justify-content-center ms-3 me-3">
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
