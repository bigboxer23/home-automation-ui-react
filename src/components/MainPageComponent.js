import React from 'react'
import RoomButton from "./RoomButton";
import GarageButton from "./GarageButton";
import SceneButton from "./SceneButton";
import ClimateButton from "./ClimateButton";

const MainPageComponent = ({ rooms, handleClick }) => (
		<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">{rooms.map(room =>
				mapRoom(room, handleClick)
		)}</div>
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

export default MainPageComponent
