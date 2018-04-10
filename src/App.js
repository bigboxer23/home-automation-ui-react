import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import '@mdi/font/css/materialdesignicons.min.css'
import RoomButton from './components/RoomButton'
import GarageButton from './components/GarageButton'
import ClimateButton from './components/ClimateButton'
import SceneButton from './components/SceneButton'

class App extends Component {
	constructor(){
		super();
		this.state = {rooms:[], data:{}};
		this.updateAndFetch = this.updateAndFetch.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.mapRoom = this.mapRoom.bind(this);
		this.getRooms = this.getRooms.bind(this);
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
			if (theData != null && theData.rooms != null)
			{
				this.setState({rooms: this.getRooms(theData), data:theData});
			}
			this.timer = setTimeout(() => this.updateAndFetch(), 3000);
		});
	}

	handleClick(id, state)
	{
		debugger;
		clearTimeout(this.timer);
		let aRoom = this.state.data.rooms.find(theRoom =>
		{
			return theRoom.id === id;
		});
		if (aRoom != null)
		{
			aRoom.devices.forEach(theDevice => theDevice.status = (state === "1"));
			this.setState({rooms: this.getRooms(this.state.data)});
		}
		fetch("S/Vera/Room/" + id + "/SwitchPower1&action=SetTarget&newTargetValue=" + state).then(() => {
			setTimeout(() => this.updateAndFetch(), 3000);
		});
	}

	getRooms(theData)
	{
		let allItems = theData.rooms.filter(theRoom => this.shouldDisplay(theRoom));
		return allItems.filter(theRoom => "Climate Control" === theRoom.name)
				.concat(allItems.filter(theRoom => "Garage" === theRoom.name))
				.concat(allItems.filter(theRoom => "Scenes" === theRoom.name))
				.concat(allItems.filter(theRoom => "Garage" !== theRoom.name && "Climate Control" !== theRoom.name && "Scenes" !== theRoom.name))
				.map(this.mapRoom);

	}

	mapRoom(theRoom)
	{
		if ("Garage" === theRoom.name)
		{
			return <GarageButton key={theRoom.name} room={theRoom} handleClick={this.handleClick}/>;
		} else if ("Climate Control" === theRoom.name)
		{
			return <ClimateButton key={theRoom.name} room={theRoom} handleClick={this.handleClick}/>;
		} else if("Scenes" === theRoom.name)
		{
			return <SceneButton key={theRoom.name} room={theRoom} handleClick={this.handleClick}/>
		}
		return <RoomButton key={theRoom.name} room={theRoom} handleClick={this.handleClick}/>;
	}

	render() {
		return (
				<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start" style={{backgroundColor:"lightgray"}}>
					{this.state.rooms}</div>
		);
	}

	shouldDisplay(theRoom)
	{
		return (this.hasLights(theRoom) || theRoom.name === "Climate Control" || theRoom.name === "Scenes"/*(theRoom.scenes != null && theRoom.scenes.length > 0)*/);
	}

	hasLights(theRoom)
	{
		return theRoom.devices != null && theRoom.devices.filter(theDevice => RoomButton.isLight(theDevice)).length > 0;
	}
}

export default App;
