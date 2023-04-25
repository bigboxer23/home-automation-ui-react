import React from "react";
import HeaderComponent from "./HeaderComponent";

const FrontDoorSecurityComponent = ({ back, load }) => (
	<div>
		<div className="background"></div>
		<HeaderComponent back={back} name={"Front Door Security"} />
		<iframe
			title={"FrontDoorSecurity"}
			className={"security room-content"}
			src={"/FrontDoor"}
			ref={load}
		></iframe>
	</div>
);

export default FrontDoorSecurityComponent;
