import React from "react";
import {getFormattedTemp, getHumidity, getIndoorTempStyle, getTemp} from "../../utils/WeatherUtilities";

const ClimateSensorComponent = ({deviceMap}) => {
	return <div className="p-2 form-group w-100 d-flex light_slider mb-2">
		<label className="flex-grow-1 mt-2 ml-2">{getName(deviceMap)}</label>
		{<div className="temp-display pr-1 pl-1 d-flex align-items-center mr-2" style={getIndoorTempStyle(getTemp(deviceMap))}>{getFormattedTemp(getTemp(deviceMap))} / {getHumidity(deviceMap)}%</div>}
	</div>
};

export const getName = (devices) =>
{
	if (devices == null)
	{
		return "";
	}
	return devices[0].name.substring(0, devices[0].name.indexOf(" "));
};

export default ClimateSensorComponent;