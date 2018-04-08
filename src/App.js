import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import '@mdi/font/css/materialdesignicons.min.css'

import { Button } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
            <HomeKitPanel/>
    );
  }
}

class HomeKitPanel extends React.Component {
    constructor(){
        super();
        this.state = {rooms:[]};
	    this.updateAndFetch = this.updateAndFetch.bind(this);
	    this.handleClick = this.handleClick.bind(this);
    }

	componentDidMount()
	{
		this.updateAndFetch();
	}

	updateAndFetch()
    {
	    fetch("SceneStatus").then(theResults =>
	    {
		    return theResults.json();
	    }).then(theData =>
	    {
		    /*public final boolean shouldDisplay()
		    {
			    return !"Garage".equals(getName()) && (hasLights() || !getScenes().isEmpty());
		    }*/
		    let roomNames = theData.rooms.filter(theRoom => this.shouldDisplay(theRoom)).map(theRoom =>
		    {
			    return <RoomButton key={theRoom.name} room={theRoom} handleClick={this.handleClick}/>;
		    });
		    this.setState({rooms:roomNames});
		    this.timer = setTimeout(() => this.updateAndFetch(), 3000);
	    });
    }

	handleClick(id, state)
	{
	    clearTimeout(this.timer);
		fetch("S/Vera/Room/" + id + "/SwitchPower1&action=SetTarget&newTargetValue=" + state).then(() => {
			setTimeout(() => this.updateAndFetch(), 1000);
		});
	}

	render() {
		return (
				<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start" style={{backgroundColor:"lightgray"}}>{this.state.rooms}</div>
		);
	}

	shouldDisplay(theRoom)
    {
	    return "Garage" != theRoom.name && (this.hasLights(theRoom) /*|| (theRoom.scenes != null && theRoom.scenes.length > 0)*/);
    }

	hasLights(theRoom)
	{
		return theRoom.devices != null && theRoom.devices.filter(theDevice => theDevice.category == 2 || theDevice.category == 3).length > 0;
	}
}

class RoomButton extends React.Component
{
    constructor(props)
    {
        super(props);
	    this.handleClick = this.handleClick.bind(this);
	    this.state = {
		    style: this.getButtonStyle(this.props.room)
	    };
    }

    render()
    {
        return <Button onClick={() => this.handleClick()} bsStyle={this.state.style} bsSize="large" className={"m-2 position-relative"}><i className="mdi mdi-lightbulb-outline"></i>{this.props.room.name}</Button>;
    }

    handleClick(e)
    {
        this.setState({style:this.isOn() ? "default" : "success"});
	    this.props.handleClick(this.props.room.id, this.isOn() ? 0 : 1);
    }

    isOn()
    {
	    if (this.props.room.devices == null)
	    {
		    return false;
	    }
	    let anOnDevice = this.props.room.devices.find(theDevice =>
	    {
		    return this.isLight(theDevice) && theDevice.status == 1;
	    });
	    return anOnDevice != null;
    }

    isLight(theDevice)
    {
        return theDevice.category == 2 || theDevice.category == 3;
    }

	getButtonStyle()
    {
        return this.isOn() ? "success" : "default";
    }

}


export default App;
