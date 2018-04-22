import React from "react";
import { Button } from 'react-bootstrap'

const SceneButton = props => (
		<Button onClick={() => props.handleClick(props.room.id)} bsStyle={"default"} bsSize="large" className={"m-2 position-relative d-flex justify-content-center"}>
			<div className="position-absolute bottom w-100 m-2 pl-2 pr-2">{props.room.name}</div>
		</Button>
);

export default SceneButton;