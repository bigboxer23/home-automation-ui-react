import React from 'react'
import RoomButton from "./RoomButton";
import GarageButton from "./GarageButton";
import ScenesButton from "./ScenesButton";
import ClimateButton from "./ClimateButton";

const MainPageComponent = ({ rooms, handleClick, handleGarageClick }) => (
		<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">{rooms.map(room =>
				mapRoom(room, handleClick, handleGarageClick)
		)}</div>
);

const mapRoom = function(theRoom, handleClick, handleGarageClick)
{
	if ("Garage" === theRoom.name)
	{
		return <GarageButton key={theRoom.name} room={theRoom} handleGarageClick={handleGarageClick}/>;
	}
	else if ("Climate Control" === theRoom.name)
	{
		return <ClimateButton key={theRoom.name} room={theRoom} handleClick={handleClick}/>;
	}
	else if ("Scenes" === theRoom.name)
	{
		return <ScenesButton key={theRoom.name} room={theRoom}/>
	}
	return <RoomButton key={theRoom.name} room={theRoom} handleClick={handleClick}/>;
};

export default MainPageComponent
