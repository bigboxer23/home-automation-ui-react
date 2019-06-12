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
	return deviceMap["Inside Humidity"] != null && deviceMap["Inside Humidity"].level !== "NULL" ? roundToTwo(deviceMap["Inside Humidity"].level) + "%" : "";
};


export const getOutsideHumidity = deviceMap =>
{
	return deviceMap["Outside Humidity"] != null && deviceMap["Outside Humidity"].level !== "NULL" ? roundToTwo(deviceMap["Outside Humidity"].level) + "%" : "";
};

export const getTemp = deviceMap =>
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

export const getIndoorTemp = deviceMap =>
{
	return deviceMap["Inside Temperature"] != null ? parseInt(deviceMap["Inside Temperature"].level, 10) : 99;
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
		return "#d1c9df";
	} else if(temperature < 10)
	{
		return "#a496c0";
	} else if(temperature < 20)
	{
		return "#3993CE";
	} else if(temperature < 30)
	{
		return "#0772B8";
	} else if(temperature < 55)
	{
		return "#03902B";
	} else if(temperature < 74)
	{
		return "#2DC558";
	} else if(temperature < 80)
	{
		return "#FECF3B";
	} else if(temperature < 85)
	{
		return "#EC9800";
	} else if(temperature < 90)
	{
		return "#DD531E";
	} else if(temperature < 93)
	{
		return "#C53600";
	} else if(temperature < 97)
	{
		return "#B10909";
	}
	return "#6F0015";
};

const formatTemp = (temperature) =>
{
	return parseFloat(Math.round(temperature * 100) / 100).toFixed(0);
};