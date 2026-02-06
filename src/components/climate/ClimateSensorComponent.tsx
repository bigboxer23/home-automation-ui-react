import React from "react";
import type { Device } from "../../types";
import {
	getFormattedTemp,
	getHumidity,
	getIndoorTempStyle,
	getTemp,
} from "../../utils/WeatherUtilities";

interface ClimateSensorComponentProps {
	deviceMap: Device[];
}

const ClimateSensorComponent: React.FC<ClimateSensorComponentProps> = ({
	deviceMap,
}) => {
	return (
		<div className="p-2 form-group w-100 d-flex light_slider mb-2">
			<label className="flex-grow-1 mt-2 ms-2">{getName(deviceMap)}</label>
			{
				<div
					className="temp-display pe-1 ps-1 d-flex align-items-center me-2"
					style={getIndoorTempStyle(getTemp(deviceMap))}
				>
					{getFormattedTemp(getTemp(deviceMap))} / {getHumidity(deviceMap)}%
				</div>
			}
		</div>
	);
};

export const getName = (devices: Device[] | null): string => {
	if (devices == null) {
		return "";
	}
	return devices[0].name.substring(0, devices[0].name.indexOf(" "));
};

export default ClimateSensorComponent;
