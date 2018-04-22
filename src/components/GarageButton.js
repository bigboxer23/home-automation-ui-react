import React from "react";
import { Button } from 'react-bootstrap'
import {getFormattedTemp, getTempStyle} from "./WeatherUtilities";

class GarageButton extends React.Component
{
	constructor(props)
	{
		super(props);
		this.findGarageDevice = this.findGarageDevice.bind(this);
	}

	render()
	{
		return <Button onClick={() => this.props.handleGarageClick(this.isDoorOpen() ? "Close" : "Open")} bsStyle={this.getButtonStyle()} bsSize="large" className={"m-2 position-relative d-flex justify-content-center"}><i className="mdi mdi-garage"></i><div className="garageTemp pr-1 pl-1 position-absolute" style={getTempStyle(this.findGarageDevice().temperature)}>{getFormattedTemp(this.findGarageDevice().temperature)}</div><div className="autoClose">{this.getAutoClose()}</div><div className="position-absolute bottom w-100 m-2 pl-2 pr-2">{this.props.room.name}</div></Button>;
	}

	getButtonStyle()
	{
		return this.isDoorOpen() ? "danger" : "default";
	}

	findGarageDevice()
	{
		return this.props.room.devices.find(theDevice => "Garage Opener" === theDevice.name);
	}

	isDoorOpen()
	{
		return this.findGarageDevice().door;
	}

	getAutoClose()
	{
		let anAutoClose = this.findGarageDevice().autoClose;
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
}
export default GarageButton;
