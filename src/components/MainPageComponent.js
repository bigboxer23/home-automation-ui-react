import React from 'react'
import {mapRoom} from "../containers/MainPage";

const MainPageComponent = ({ rooms, handleClick, handleGarageClick, handleMoreClick, handleGarageMoreClick}) => (
		<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">{rooms.map(room =>
				mapRoom(room, handleClick, handleGarageClick, handleMoreClick, handleGarageMoreClick)
		)}</div>
);

export default MainPageComponent
