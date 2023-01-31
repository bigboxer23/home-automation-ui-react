import React from 'react'
import HeaderComponent from "../HeaderComponent"
import MeuralNextButton from "./MeuralNextButton";

const MeuralPageComponent = ({back}) => (
		<div>
			<div className='background'></div>
			<HeaderComponent back={back} name={"Meural Control"}/>
			<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start room-content">
				<MeuralNextButton key={"next"}/>
			</div>
		</div>
);

export default MeuralPageComponent;