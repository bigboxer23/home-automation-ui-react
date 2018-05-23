import React from 'react'
import RoomButton from "./room/RoomButton";
import GarageButton from "./garage/GarageButton";
import ScenesButton from "./scene/ScenesButton";
import ClimateButton from "./climate/ClimateButton";

const MainPageComponent = ({ rooms, handleClick, handleGarageClick, handleMoreClick, handleGarageMoreClick}) => (
		<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">{rooms.map(room =>
				mapRoom(room, handleClick, handleGarageClick, handleMoreClick, handleGarageMoreClick)
		)}</div>
);

const mapRoom = function(theRoom, handleClick, handleGarageClick, handleMoreClick, handleGarageMoreClick)
{
	if ("Garage" === theRoom.name)
	{
		return <GarageButton key={theRoom.name} room={theRoom} handleGarageClick={handleGarageClick} handleGarageMoreClick={handleGarageMoreClick}/>;
	}
	else if ("Climate Control" === theRoom.name)
	{
		return <ClimateButton key={theRoom.name} room={theRoom} handleClick={handleClick}/>;
	}
	else if ("Scenes" === theRoom.name)
	{
		return <ScenesButton key={theRoom.name} room={theRoom}/>
	}
	return <RoomButton key={theRoom.name} room={theRoom} handleClick={handleClick} handleMoreClick={handleMoreClick}/>;
};

export default MainPageComponent
