import React from "react";
import HeaderComponent from "../HeaderComponent";
import type { Device, DeviceMap } from "../../types";
import {
	getCurrentOutsideTemp,
	isFanModeActive,
	isHVACModeActive,
	getThermostatSetPoint,
	getThermostatBattery,
	getThermometerItems,
} from "../../containers/ClimatePage";
import {
	getFormattedTemp,
	getTempStyle,
	getIndoorTempStyle,
	getOutsideHumidity,
} from "../../utils/WeatherUtilities";
import MotionSensorComponent from "../room/MotionSensorComponent";
import IOSSlider from "../ui/IOSSlider";
import { SegmentedControl, SegmentedOption } from "../ui/SegmentedControl";

interface ClimatePageComponentProps {
	back: () => void;
	deviceMap: DeviceMap;
	sliderChange: (event: Event, newValue: number | number[]) => void;
	slideStop: (
		event: Event | React.SyntheticEvent,
		newValue: number | number[],
	) => void;
	fanModeChange: (value: string) => void;
	hvacModeChange: (value: string) => void;
}

export default function ClimatePageComponent({
	back,
	deviceMap,
	sliderChange,
	slideStop,
	fanModeChange,
	hvacModeChange,
}: ClimatePageComponentProps) {
	return (
		<div>
			<div className="background"></div>
			<HeaderComponent back={back} name={"Climate"} />
			<div className="px-2 pb-2 w-full h-full flex flex-wrap justify-center content-start room-content">
				<div className="p-2 w-full flex bg-white/70 rounded-2xl mb-2">
					<label className="grow mt-2 ms-2">Outside</label>
					<div
						className="rounded-lg text-white min-w-8.75 flex justify-center pe-1 ps-1 items-center me-2"
						style={getTempStyle(getCurrentOutsideTemp(deviceMap))}
					>
						{getFormattedTemp(getCurrentOutsideTemp(deviceMap))} /{" "}
						{getOutsideHumidity(deviceMap)}
					</div>
				</div>
				{getThermometerItems(deviceMap)}
				<div className="bg-surface/34 w-full">
					<div className="p-2 w-full pointer-events-none opacity-40">
						<label>Fan Mode</label>
						<SegmentedControl className="w-full">
							<SegmentedOption
								className="w-full"
								active={isFanModeActive("1", deviceMap)}
								onClick={() => fanModeChange("1")}
							>
								On
							</SegmentedOption>
							<SegmentedOption
								className="w-full"
								active={isFanModeActive("0", deviceMap)}
								onClick={() => fanModeChange("0")}
							>
								Auto
							</SegmentedOption>
						</SegmentedControl>
					</div>
					<div className="p-2 w-full pointer-events-none opacity-40">
						<label>HVAC Mode</label>
						<SegmentedControl className="w-full">
							<SegmentedOption
								className="w-full"
								active={isHVACModeActive("0", deviceMap)}
								onClick={() => hvacModeChange("0")}
							>
								Off
							</SegmentedOption>
							<SegmentedOption
								className="w-full"
								active={isHVACModeActive("2", deviceMap)}
								onClick={() => hvacModeChange("2")}
							>
								Cool
							</SegmentedOption>
							<SegmentedOption
								className="w-full"
								active={isHVACModeActive("1", deviceMap)}
								onClick={() => hvacModeChange("1")}
							>
								Heat
							</SegmentedOption>
						</SegmentedControl>
					</div>
					<div className="p-2 w-full flex pointer-events-none opacity-40">
						<label className="grow">Thermostat</label>
						<div
							className="rounded-lg text-white min-w-8.75 flex justify-center pe-1 ps-1 items-center"
							style={getIndoorTempStyle(getThermostatSetPoint(deviceMap))}
						>
							{getFormattedTemp(getThermostatSetPoint(deviceMap))}
						</div>
					</div>
					<div className="p-2 w-full flex pointer-events-none opacity-40">
						{
							<IOSSlider
								value={getThermostatSetPoint(deviceMap)}
								onChange={sliderChange}
								onChangeCommitted={slideStop}
								valueLabelDisplay={"auto"}
								min={65}
								max={74}
							/>
						}
					</div>
					<MotionSensorComponent
						key={getThermostatBattery(deviceMap).name}
						device={getThermostatBattery(deviceMap)}
						styleName={"pointer-events-none opacity-40"}
					/>
				</div>
			</div>
		</div>
	);
}
