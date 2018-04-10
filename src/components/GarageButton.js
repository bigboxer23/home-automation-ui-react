import React from "react";
import { Button } from 'react-bootstrap'

class GarageButton extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.findGarageNode = this.findGarageNode.bind(this);
	}

	render()
	{
		return <Button onClick={() => this.handleClick()} bsStyle={this.getButtonStyle()} bsSize="large" className={"m-2 position-relative d-flex justify-content-center"}><i className="mdi mdi-garage"></i><div className="garageTemp pr-1 pl-1 position-absolute" style={this.getTempStyle()}>{this.getFormattedTemp()}</div><div className="autoClose">{this.getAutoClose()}</div><div className="position-absolute bottom w-100 m-2 pl-2 pr-2">{this.props.room.name}</div></Button>;
	}

	handleClick(e)
	{
		fetch("S/Garage/" + (this.isDoorOpen() ? "Close" : "Open"));
	}

	getButtonStyle()
	{
		return this.isDoorOpen() ? "danger" : "default";
	}

	findGarageNode()
	{
		return this.props.room.devices.find(theDevice => "Garage Opener" === theDevice.name);
	}

	isDoorOpen()
	{
		return this.findGarageNode().door;
	}

	getAutoClose()
	{
		let anAutoClose = this.findGarageNode().autoClose;
		if (anAutoClose === 0)
		{
			return "";
		}
		let seconds = Math.round((anAutoClose /1000 ) % 60);
		let minutes = Math.round((anAutoClose / (1000 * 60)) % 60);
		let hours = Math.round((anAutoClose / (1000 * 60 * 60)) % 24);
		let aAutoCloseString = "";
		if (hours > 0)
		{
			aAutoCloseString += hours + ":";
		}
		return aAutoCloseString + (minutes < 10 && hours > 0 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds + "";
	}

	getFormattedTemp()
	{
		return this.getTemp() + "°";
	}

	getTempStyle()
	{
		return {backgroundColor:this.getTempColor()};
	}

	getTempColor()
	{
		let aTemp = this.findGarageNode().temperature;
		if (aTemp < -10)
		{
			return "#feffff";
		} else if(aTemp < 0)
		{
			return "#d1c9df";
		} else if(aTemp < 10)
		{
			return "#a496c0";
		} else if(aTemp < 20)
		{
			return "#3993CE";
		} else if(aTemp < 30)
		{
			return "#0772B8";
		} else if(aTemp < 40)
		{
			return "#03902B";
		} else if(aTemp < 50)
		{
			return "#2DC558";
		} else if(aTemp < 60)
		{
			return "#FECF3B";
		} else if(aTemp < 70)
		{
			return "#EC9800";
		} else if(aTemp < 80)
		{
			return "#DD531E";
		} else if(aTemp < 90)
		{
			return "#C53600";
		} else if(aTemp < 100)
		{
			return "#B10909";
		}
		return "#6F0015";
	}
	
	getTemp()
	{
		return parseFloat(Math.round(this.findGarageNode().temperature * 100) / 100).toFixed(0);
	}
}
export default GarageButton;
