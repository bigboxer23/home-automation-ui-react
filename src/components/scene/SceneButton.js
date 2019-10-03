import React from "react";
import { Button } from 'react-bootstrap'

const SceneButton = props => (
		<div>
			<Button onClick={() => props.handleClick(props.room.id, "ON")} bsStyle={"default"} bsSize="large" className={"mb-3 m-1 position-relative d-flex justify-content-center"}>
				<i className="mdi mdi-lightbulb-outline"/>
				<div className="position-absolute bottom w-100 m-2 pl-2 pr-2">{props.room.name} On</div>
			</Button>
		<Button onClick={() => props.handleClick(props.room.id, "OFF")} bsStyle={"default"} bsSize="large" className={"m-1 position-relative d-flex justify-content-center"}>
			<i className="mdi mdi-lightbulb-outline"/>
			<div className="position-absolute bottom w-100 m-2 pl-2 pr-2">{props.room.name} Off</div>
		</Button>
		</div>
);

export default SceneButton;