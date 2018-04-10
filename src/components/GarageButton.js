import React from "react";
import { Button } from 'react-bootstrap'

class GarageButton extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	render()
	{
		return <Button onClick={() => this.handleClick()} bsStyle={this.getButtonStyle(this.props.room)} bsSize="large" className={"m-2 position-relative d-flex justify-content-center"}><i className="mdi mdi-garage"></i><div className="position-absolute bottom w-100 m-2 pl-2 pr-2">{this.props.room.name}</div></Button>;
	}

	handleClick(e)
	{
		fetch("S/Garage/" + (this.props.room.devices.find(theDevice => "Garage Opener" === theDevice.name).door ? "Close" : "Open"));
	}


	getButtonStyle(theRoom)
	{
		return theRoom.devices.find(theDevice => "Garage Opener" === theDevice.name).door ? "danger" : "default";
	}
}
export default GarageButton;
