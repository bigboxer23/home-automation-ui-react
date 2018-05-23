import React from 'react'
import HeaderComponent from "../HeaderComponent"
import {getHeader} from "../../containers/GaragePage";

const GaragePageComponent = ({back, room, handleClick }) => (
		<div>
			<HeaderComponent back={back} name={getHeader(room)}/>
			Test
		</div>
);

export default GaragePageComponent