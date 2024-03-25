import React from "react";
import { getHeaderTitle, getRoomDimLevel } from "../../containers/RoomPage";
import IOSSwitch from "../ui/IOSSwitch";
import IOSSlider from "../ui/IOSSlider";

export const RoomHeaderComponent = function ({
	room,
	back,
	setDeviceStatus,
	sliderChange,
	slideStop,
}) {
	const name = getHeaderTitle(room, "flex-grow-1");

	return (
		<div className="header d-flex flex-column">
			<div className="d-flex align-items-center w-100 flex-row">
				<span
					className="mdi mdi-chevron-left mdi-36px z-index-1 "
					onClick={back}
				></span>
				{name}
				<IOSSwitch
					className="me-4"
					checked={getRoomDimLevel(room) > 0}
					onChange={(event) => setDeviceStatus(room.id, event.target.checked)}
				/>
			</div>
			<div className="d-flex btn-group btn-group-toggle justify-content-center ms-3 me-3">
				{
					<IOSSlider
						value={getRoomDimLevel(room)}
						onChange={(event, newValue) => sliderChange(newValue, room.id)}
						onChangeCommitted={(event, newValue) =>
							slideStop(newValue, room.id)
						}
						valueLabelDisplay={"auto"}
						min={0}
						max={100}
					/>
				}
			</div>
		</div>
	);
};
