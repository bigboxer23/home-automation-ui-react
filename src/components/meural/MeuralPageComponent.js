import React from 'react'
import HeaderComponent from "../HeaderComponent"

const MeuralPageComponent = ({back}) => (
		<div>
			<div className='background'></div>
			<HeaderComponent back={back} name={"Meural Control"}/>
		</div>
);

export default MeuralPageComponent;