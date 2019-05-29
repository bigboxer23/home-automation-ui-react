import React from "react";
import {getFormattedTemp, getIndoorTempStyle} from "../../utils/WeatherUtilities";

const ThermostatComponent = ({deviceMap}) => {
	return <div className="p-2 form-group w-100 d-flex">
		<label className="flex-grow-1">{getName(deviceMap)}</label>
		{<div className="temp-display pr-1 pl-1 d-flex align-items-center" style={getIndoorTempStyle(getTemp(deviceMap))}>{getFormattedTemp(getTemp(deviceMap))} / {getHumidity(deviceMap)}%</div>}
	</div>
};

const getTemp = deviceMap =>
{
	if (deviceMap == null)
	{
		return 99;
	}
	let aDevice = deviceMap.find(device => device.name.endsWith("Temperature"));
	let aTemp = aDevice != null ? parseInt(aDevice.level, 10) : 99;
	if (aTemp > 15 && aTemp <  30)//C
	{
		aTemp = (aTemp * 9 / 5 + 32)
	}
	return aTemp;
};

const getHumidity = deviceMap =>
{
	if (deviceMap == null)
	{
		return 99;
	}
	let aDevice = deviceMap.find(device => device.name.endsWith("Humidity"));
	return aDevice != null ? parseInt(aDevice.level, 10) : 99;
};

export const getName = (devices) =>
{
	if (devices == null)
	{
		return "";
	}
	return devices[0].name.substring(0, devices[0].name.indexOf(" "));
};

export default ThermostatComponent;