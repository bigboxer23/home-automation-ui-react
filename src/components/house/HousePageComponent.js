import React from 'react'
import HeaderComponent from "../HeaderComponent"
import SceneButton from "../scene/SceneButton";

const HousePageComponent = ({back, rooms, handleClick }) => (
		<div>
			<HeaderComponent back={back} name={"Scenes"}/>
			<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">
				{rooms.map(room => <SceneButton key={room.name} room={room} handleClick={handleClick}/>)}
			</div>
		</div>
);

export default HousePageComponent