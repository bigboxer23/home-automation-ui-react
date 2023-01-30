import React from "react";
import { Button } from 'react-bootstrap'
import {getTemp} from "../../utils/WeatherUtilities";
class RoomButton extends React.Component
{
	render()
	{
		return <Button onClick={() => this.props.handleClick(this.props.room.id, RoomButton.isOn(this.props.room) ? 0 : 100)} variant={this.getButtonStyle()} size="lg" className={"m-1 position-relative d-flex justify-content-center"}>
			<i className={"mdi mdi-lightbulb-outline" + this.getBatteryWarningStyle(this.props.room) + RoomButton.getLockedStatus(this.props.room)}/>
			<i className={"mdi mdi-dots-horizontal inFront" + RoomButton.areDotsHidden(this.props.room)} onClick={(event) => this.props.handleMoreClick(event, this.props.room.name)}/>
			<div className="temp-display pe-1 ps-1 position-absolute total-lights-bg">{RoomButton.getCountContent(this.props.room)}</div>
			<div className="position-absolute bottom w-100 m-2 ps-2 pe-3">{this.props.room.name}</div>
		</Button>;
	}

	static isOn(theRoom)
	{
		if (theRoom.devices == null)
		{
			return false;
		}
		let anOnDevice = theRoom.devices.find(theDevice =>
		{
			return RoomButton.isLight(theDevice) && theDevice.status === "1" && theDevice.level !== "NULL" && !theDevice.name.includes("Override");
		});
		return anOnDevice != null;
	}

	static onCount(theRoom)
	{
		let aCount = 0;
		if (theRoom.devices == null)
		{
			return aCount;
		}
		theRoom.devices.forEach(theDevice =>
		{
			if (RoomButton.isLight(theDevice) && theDevice.status === "1" && theDevice.level !== "NULL" && !theDevice.name.includes("Override"))
			{
				aCount++;
			}
		});
		return aCount;
	}

	static isLight(theDevice)
	{
		return theDevice.category === "2" || theDevice.category === "3" /*&& !theDevice.name.includes("Override")*/;
	}

	static isFan(theDevice)
	{
		return theDevice.category === "3";
	}

	static areDotsHidden(theRoom)
	{
		return RoomButton.getCountContent(theRoom) === "" ? "" : " hide";
	}

	static getRoomTemp(theRoom)
	{
		let temp = getTemp(theRoom.devices);
		return temp < 99 ? temp : "";
	}

	static getLockedStatus(theRoom)
	{
		if (theRoom.devices != null && theRoom.devices
				.some(theDevice => theDevice.name != null && theDevice.name.includes("Override") && theDevice.status === "1"))
		{
			return " mdi-lock-outline";
		}
		return "";
	}

	static getCountContent(theRoom)
	{
		let aCount = RoomButton.onCount(theRoom);
		return aCount === 0 ? RoomButton.getRoomTemp(theRoom) : aCount;
	}

	getBatteryWarningStyle(theRoom)
	{
		let aLowBatteries = theRoom.devices.find(theDevice =>
		{
			return theDevice.name != null && theDevice.name.endsWith("Battery") && parseInt(theDevice.level, 10) < 40 && parseInt(theDevice.level, 10) !== 0;
		});
		if (aLowBatteries != null)
		{
			return " danger";
		}
		return "";
	}

	getButtonStyle()
	{
		return RoomButton.isOn(this.props.room) ? "success" : "default";
	}
}
export default RoomButton;
