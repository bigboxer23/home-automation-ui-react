import React from 'react'
import HeaderComponent from "../HeaderComponent"
import SceneButton from "./SceneButton";
import {Button} from "react-bootstrap";

const ScenePageComponent = ({back, rooms, handleClick, gotoSecurity }) => (
		<div>
			<HeaderComponent back={back} name={"Scenes"}/>
			<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start room-content">
				{rooms.map(room => <SceneButton key={room.name} room={room} handleClick={handleClick}/>)}
				<Button onClick={() => gotoSecurity()} variant="" size="lg" className={"mb-3 m-1 position-relative d-flex justify-content-center"}>
					<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">Front Door Security</div>
				</Button>
			</div>
		</div>
);

export default ScenePageComponent