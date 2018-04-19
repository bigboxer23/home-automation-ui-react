import React from 'react'
import RoomButton from "./RoomButton";
import GarageButton from "./GarageButton";
import SceneButton from "./SceneButton";
import ClimateButton from "./ClimateButton";
import HeaderComponent from "./HeaderComponent"

const ScenePageComponent = ({back }) => (
		<div><HeaderComponent back={back}/>Scene page!</div>
);

const mapRoom = function(theRoom, handleClick)
{
	if ("Garage" === theRoom.name)
	{
		return <GarageButton key={theRoom.name} room={theRoom}/>;
	}
	else if ("Climate Control" === theRoom.name)
	{
		return <ClimateButton key={theRoom.name} room={theRoom} handleClick={handleClick}/>;
	}
	else if ("Scenes" === theRoom.name)
	{
		return <SceneButton key={theRoom.name} room={theRoom}/>
	}
	return <RoomButton key={theRoom.name} room={theRoom} handleClick={handleClick}/>;
};

export default ScenePageComponent