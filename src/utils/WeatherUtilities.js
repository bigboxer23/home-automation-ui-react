export const getFormattedTemp = (temperature) =>
{
	return formatTemp(temperature) + "°";
};

export const getTempStyle = (temperature) =>
{
	return {backgroundColor:getTempColor(temperature)};
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