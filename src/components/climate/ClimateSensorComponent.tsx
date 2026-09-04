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
		<div className="tw:p-2 tw:w-full tw:flex light_slider tw:mb-2">
			<label className="tw:grow tw:mt-2 tw:ms-2">{getName(deviceMap)}</label>
			{
				<div
					className="temp-display tw:pe-1 tw:ps-1 tw:flex tw:items-center tw:me-2"
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
