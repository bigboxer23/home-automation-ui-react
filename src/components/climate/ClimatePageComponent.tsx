import React from "react";
import HeaderComponent from "../HeaderComponent";
import type { Device, DeviceMap } from "../../types";
import {
	getCurrentOutsideTemp,
	getFanModeStyle,
	getHVACStyle,
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
			<div className="tw:p-2 tw:w-full tw:h-full tw:flex tw:flex-wrap tw:justify-center tw:content-start room-content">
				<div className="tw:p-2 tw:w-full tw:flex light_slider tw:mb-2">
					<label className="tw:grow tw:mt-2 tw:ms-2">Outside</label>
					<div
						className="temp-display tw:pe-1 tw:ps-1 tw:flex tw:items-center tw:me-2"
						style={getTempStyle(getCurrentOutsideTemp(deviceMap))}
					>
						{getFormattedTemp(getCurrentOutsideTemp(deviceMap))} /{" "}
						{getOutsideHumidity(deviceMap)}
					</div>
				</div>
				{getThermometerItems(deviceMap)}
				<div className="thermostat-content tw:w-full">
					<div className="tw:p-2 tw:w-full disabled">
						<label>Fan Mode</label>
						<div className="tw:w-full tw:flex btn-group">
							<label
								className={getFanModeStyle("1", deviceMap)}
								onClick={() => fanModeChange("1")}
							>
								On
							</label>
							<label
								className={getFanModeStyle("0", deviceMap)}
								onClick={() => fanModeChange("0")}
							>
								Auto
							</label>
						</div>
					</div>
					<div className="tw:p-2 tw:w-full disabled">
						<label>HVAC Mode</label>
						<div className="tw:w-full tw:flex btn-group">
							<label
								className={getHVACStyle("0", deviceMap)}
								onClick={() => hvacModeChange("0")}
							>
								Off
							</label>
							<label
								className={getHVACStyle("2", deviceMap)}
								onClick={() => hvacModeChange("2")}
							>
								Cool
							</label>
							<label
								className={getHVACStyle("1", deviceMap)}
								onClick={() => hvacModeChange("1")}
							>
								Heat
							</label>
						</div>
					</div>
					<div className="tw:p-2 tw:w-full tw:flex disabled">
						<label className="tw:grow">Thermostat</label>
						<div
							className="temp-display tw:pe-1 tw:ps-1 tw:flex tw:items-center"
							style={getIndoorTempStyle(getThermostatSetPoint(deviceMap))}
						>
							{getFormattedTemp(getThermostatSetPoint(deviceMap))}
						</div>
					</div>
					<div className="tw:p-2 tw:w-full tw:flex disabled">
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
						styleName={"disabled"}
					/>
				</div>
			</div>
		</div>
	);
}
