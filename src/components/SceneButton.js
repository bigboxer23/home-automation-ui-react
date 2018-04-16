import React from "react";
import { Button } from 'react-bootstrap'

class SceneButton extends React.Component
{
	render()
	{
		return <Button onClick={() => this.props.history.push('/Scenes')} bsStyle={"default"} bsSize="large" className={"m-2 position-relative d-flex justify-content-center"}>
					<i className="mdi mdi-clock"></i>
					<div className="position-absolute bottom w-100 m-2 pl-2 pr-2">Scenes</div>
				</Button>;
	}
}

export default SceneButton;
