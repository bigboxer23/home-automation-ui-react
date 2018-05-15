import React from "react";
import { Button } from 'react-bootstrap'

class RoomButton extends React.Component
{
	render()
	{
		return <Button onClick={() => this.props.handleClick(this.props.room.id, RoomButton.isOn(this.props.room) ? 0 : 1)} bsStyle={this.getButtonStyle()} bsSize="large" className={"m-2 position-relative d-flex justify-content-center"}>
			<i className="mdi mdi-lightbulb-outline"/>
			<i className="mdi mdi-dots-horizontal" onClick={(event) => this.props.handleMoreClick(event, this.props.room.name)}/>
			<div className="position-absolute bottom w-100 m-2 pl-2 pr-3">{this.props.room.name}</div>
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
			return RoomButton.isLight(theDevice) && theDevice.status === "1";
		});
		return anOnDevice != null;
	}

	static isLight(theDevice)
	{
		return theDevice.category === "2" || theDevice.category === "3";
	}

	static isFan(theDevice)
	{
		return theDevice.category === "3";
	}

	getButtonStyle()
	{
		return RoomButton.isOn(this.props.room) ? "success" : "default";
	}
}
export default RoomButton;
