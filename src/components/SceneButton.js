import React from "react";
import { Button } from 'react-bootstrap'

class ClimateButton extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	render()
	{
		return <Button onClick={() => this.handleClick()} bsStyle={this.getButtonStyle(this.props.room)} bsSize="large" className={"m-2 position-relative d-flex justify-content-center"}><i className="mdi mdi-clock"></i><div className="position-absolute bottom w-100 m-2 pl-2 pr-2">Scenes</div></Button>;
	}

	handleClick(e)
	{
		this.setState({style:this.isOn() ? "default" : "success"});
		this.props.handleClick(this.props.room.id, this.isOn() ? 0 : 1);
	}


	getButtonStyle()
	{
		return true ? "success" : "default";
	}
}
export default ClimateButton;
