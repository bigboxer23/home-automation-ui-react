export const getHumidity = deviceMap =>
{
	if (deviceMap == null)
	{
		return "";
	}
	let aDevice = deviceMap.find(device => device.name.endsWith("Humidity"));
	return aDevice != null ? roundToTwo(aDevice.level) : "";
};

export const getInsideHumidity = deviceMap =>
{
	return getDeviceHumidity(deviceMap, "Inside Humidity");
};


export const getOutsideHumidity = deviceMap =>
{
	return getDeviceHumidity(deviceMap, "Outside Humidity");
};

const getDeviceHumidity = (deviceMap, deviceId) =>
{
	return deviceMap[deviceId] != null && deviceMap[deviceId].level !== "NULL" ? roundToTwo(deviceMap[deviceId].level) + "%" : "";
};

export const getTemp = deviceMap =>
{
	if (deviceMap == null)
	{
		return 99;
	}
	let aDevice = deviceMap.find(device => device.name.endsWith("Temperature"));
	let aTemp = aDevice != null ? parseFloat(aDevice.level, 10) : 99;
	if (aTemp > 15 && aTemp <  35)//C
	{
		aTemp = (aTemp * 9 / 5 + 32)
	}
	return aTemp;
};

export const getIndoorTemp = deviceMap =>
{
	return deviceMap["Inside Temperature"] != null ? parseFloat(deviceMap["Inside Temperature"].level, 10) : 99;
};

const roundToTwo = number =>
{
	return +(Math.round(parseFloat(number) + "e+2")  + "e-2");
};

export const getFormattedTemp = (temperature) =>
{
	return formatTemp(temperature) + "°";
};

export const getTempStyle = (temperature) =>
{
	return temperature === -1 ? {opacity:0} : {backgroundColor:getTempColor(temperature)};
};

export const getIndoorTempStyle = (temperature) =>
{
	return {backgroundColor:getIndoorTempColor(temperature)};
};

const getIndoorTempColor = (temperature) =>
{
	if(temperature < 68)
	{
		return "#3993CE";
	} else if(temperature < 70)
	{
		return "#008990";
	} else if(temperature < 71)
	{
		return "#03902B";
	} else if(temperature < 73)
	{
		return "#2DC558";
	} else if(temperature < 74)
	{
		return "#FECF3B";
	} else if(temperature < 76)
	{
		return "#EC9800";
	}
	return "#6F0015";
};

const getTempColor = (temperature) =>
{
	if(temperature < 0)
	{
		return "#2757ea";
	} else if(temperature < 10)
	{
		return "#4a9cdd";
	} else if(temperature < 20)
	{
		return "#68dce2";
	} else if(temperature < 40)
	{
		return "#86eff9";
	} else if(temperature < 50)
	{
		return "#75f87a";
	} else if(temperature < 74)
	{
		return "#6edf4f";
	} else if(temperature < 80)
	{
		return "#bbf950";
	} else if(temperature < 85)
	{
		return "#dbdd4c";
	} else if(temperature < 90)
	{
		return "#e8a43b";
	} else if(temperature < 93)
	{
		return "#df5827";
	} else if(temperature < 97)
	{
		return "#9a1e14";
	}
	return "#6F0015";
};

const formatTemp = (temperature) =>
{
	return parseFloat(Math.round(temperature * 100) / 100).toFixed(0);
};