import React from "react";
import HeaderComponent from "./HeaderComponent";

const CameraComponent = ({ back, load, getSource, getName }) => (
	<div>
		<div className="background"></div>
		<HeaderComponent back={back} name={"" + getName()} />
		<iframe
			className={"security room-content"}
			src={"" + getSource()}
			ref={load}
		></iframe>
	</div>
);

export default CameraComponent;
