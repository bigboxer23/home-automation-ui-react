import React from 'react'
import HeaderComponent from "../HeaderComponent"
import MeuralNextButton from "./MeuralNextButton";
import MeuralOnOffButton from "./MeuralOnOffButton";
import MeuralPreviousButton from "./MeuralPreviousButton";
import MeuralSourceButton from "./MeuralSourceButton";

const MeuralPageComponent = ({back, device}) => (
		<div>
			<div className='background'></div>
			<HeaderComponent back={back} name={"Meural Control"}/>
			<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start room-content">
				<MeuralSourceButton device={device}/>
				<MeuralOnOffButton key={device} device={device}/>
				<MeuralPreviousButton key={"previous"}/>
				<MeuralNextButton key={"next"}/>
			</div>
		</div>
);

export default MeuralPageComponent;