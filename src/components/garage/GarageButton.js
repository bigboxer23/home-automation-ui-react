import React from "react";
import { Button } from 'react-bootstrap'
import {getFormattedTemp, getTempStyle} from "./WeatherUtilities";

class GarageButton extends React.Component
{
	constructor(props)
	{
		super(props);
		GarageButton.findGarageDevice = GarageButton.findGarageDevice.bind(this);
	}

	render()
	{
		return <Button onClick={() => this.props.handleGarageClick(GarageButton.isDoorOpen(this.props.room) ? "Close" : "Open")} bsStyle={this.getButtonStyle()} bsSize="large" className={"m-2 position-relative d-flex justify-content-center"}>
			<i className="mdi mdi-garage"></i>
			<div className="tempDisplay pr-1 pl-1 position-absolute" style={getTempStyle(GarageButton.findGarageDevice(this.props.room).temperature)} onClick={(event) => this.props.handleGarageMoreClick(event)}>{getFormattedTemp(GarageButton.findGarageDevice(this.props.room).temperature)}</div>
			<div className="autoClose">{GarageButton.getAutoClose(this.props.room)}</div>
			<div className="position-absolute bottom w-100 m-2 pl-2 pr-2">{this.props.room.name}</div>
		</Button>;
	}

	getButtonStyle()
	{
		return GarageButton.isDoorOpen(this.props.room) ? "danger" : "default";
	}

	static findGarageDevice(room)
	{
		return room == null ? null : room.devices.find(theDevice => "Garage Opener" === theDevice.name);
	}

	static isDoorOpen(room)
	{
		return GarageButton.findGarageDevice(room).door;
	}

	static getAutoClose(room)
	{
		if (GarageButton.findGarageDevice(room) == null)
		{
			return "";
		}
		let anAutoClose = GarageButton.findGarageDevice(room).autoClose;
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
