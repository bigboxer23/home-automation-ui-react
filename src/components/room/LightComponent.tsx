import React from "react";
import type { Device } from "../../types";
import IOSSlider from "../ui/IOSSlider";
import IOSSwitch from "../ui/IOSSwitch";
import { getIntegerLevel } from "../../containers/RoomPage";
import { isFan } from "./RoomUtils";

interface LightComponentProps {
	device: Device;
	sliderChange: (newValue: number | number[], id: string) => void;
	slideStop: (newValue: number | number[], id: string) => void;
	setDeviceStatus: (id: string, checked: boolean) => void;
}

export default function LightComponent({
	device,
	sliderChange,
	slideStop,
	setDeviceStatus,
}: LightComponentProps) {
	if (isFan(device)) {
		return (
			<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start light_slider mb-2">
				<div className="form-group w-100 mt-2 mb-2">
					<div className="w-100 d-flex">
						<label className="ms-4 w-100">{device.name}</label>
						<IOSSwitch
							className="me-2"
							checked={parseInt(device.level ?? "0", 10) > 0}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								setDeviceStatus(device.id, event.target.checked)
							}
						/>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start light_slider mb-2">
			<div className="form-group w-100">
				<div className="w-100 d-flex">
					<label className="ms-4 w-100">{device.name}</label>
					<IOSSwitch
						className="me-2"
						checked={parseInt(device.level ?? "0", 10) > 0}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							setDeviceStatus(device.id, event.target.checked)
						}
					/>
				</div>
				<div className=" d-flex btn-group btn-group-toggle justify-content-center">
					<IOSSlider
						value={getIntegerLevel(device)}
						onChange={(event: Event, newValue: number | number[]) =>
							sliderChange(newValue, device.id)
						}
						onChangeCommitted={(
							event: Event | React.SyntheticEvent,
							newValue: number | number[],
						) => slideStop(newValue, device.id)}
						valueLabelDisplay={"auto"}
						min={0}
						max={100}
					/>
				</div>
			</div>
		</div>
	);
}
