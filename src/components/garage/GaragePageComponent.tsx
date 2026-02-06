import React from "react";
import HeaderComponent from "../HeaderComponent";
import type { Room } from "../../types";
import {
	getAutoCloseButtonStyle,
	getAutoCloseDelay,
	getHeader,
} from "../../containers/GaragePage";
import LightComponent from "../room/LightComponent";
import { getRoomDimLevel } from "../../containers/RoomPage";
import GarageAutoCloseButton from "./GarageAutoCloseButton";
import IOSSlider from "../ui/IOSSlider";
import IOSSwitch from "../ui/IOSSwitch";
import { isLight } from "../room/RoomUtils";

interface GaragePageComponentProps {
	back: () => void;
	room: Room;
	sliderChange: (newValue: number | number[], id: string) => void;
	slideStop: (newValue: number | number[], id: string) => void;
	setDeviceStatus: (id: string, checked: boolean) => void;
	autoCloseClickHandler: (delay: any) => void;
}

export default function GaragePageComponent({
	back,
	room,
	sliderChange,
	slideStop,
	setDeviceStatus,
	autoCloseClickHandler,
}: GaragePageComponentProps) {
	return (
		<div>
			<div className="background"></div>
			<HeaderComponent back={back} name={getHeader(room)} />
			<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start room-content">
				<GarageAutoCloseButton
					onClick={() => autoCloseClickHandler(getAutoCloseDelay(room))}
					buttonText="Disable Auto Close"
					class={getAutoCloseButtonStyle(room)}
				/>
				<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start light_slider mb-2">
					<div className="form-group w-100">
						<div className="w-100 d-flex">
							<label className="ms-4 w-100">Overall Room</label>
							<IOSSwitch
								className="me-2"
								checked={getRoomDimLevel(room) > 0}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setDeviceStatus(room.id, event.target.checked)
								}
							/>
						</div>
						<div className="d-flex btn-group btn-group-toggle justify-content-center">
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
				</div>
				{room.devices.map((device) =>
					isLight(device) ? (
						<LightComponent
							key={device.name}
							device={device}
							sliderChange={sliderChange}
							slideStop={slideStop}
							setDeviceStatus={setDeviceStatus}
						/>
					) : (
						""
					),
				)}
			</div>
		</div>
	);
}
