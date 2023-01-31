import React from 'react'
import HeaderComponent from "./HeaderComponent"

const FrontDoorSecurityComponent = ({back}) => (
		<div>
			<div className='background'></div>
			<HeaderComponent back={back} name={"Front Door Security"}/>
			<iframe title={"FrontDoorSecurity"} className={"security"} src={"/FrontDoor"}></iframe>
		</div>
);

export default FrontDoorSecurityComponent;