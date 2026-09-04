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
			<div className="tw:p-2 tw:w-full tw:h-full tw:flex tw:flex-wrap tw:justify-center tw:content-start light_slider tw:mb-2">
				<div className="tw:w-full tw:mt-2 tw:mb-2">
					<div className="tw:w-full tw:flex">
						<label className="tw:ms-2 tw:w-full">{device.name}</label>
						<IOSSwitch
							className="tw:me-2"
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
		<div className="tw:p-2 tw:w-full tw:h-full tw:flex tw:flex-wrap tw:justify-center tw:content-start light_slider tw:mb-2">
			<div className="tw:w-full">
				<div className="tw:w-full tw:flex">
					<label className="tw:ms-2 tw:w-full tw:text-[0.875em]">
						{device.name}
					</label>
				</div>
				<div className=" tw:flex btn-group tw:justify-center tw:items-center">
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
					<IOSSwitch
						className="tw:me-2"
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
