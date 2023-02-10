import React from "react";
import HeaderComponent from "../HeaderComponent";
import MeuralNextButton from "./MeuralNextButton";
import MeuralOnOffButton from "./MeuralOnOffButton";
import MeuralPreviousButton from "./MeuralPreviousButton";
import MeuralSourceButton from "./MeuralSourceButton";
import MeuralGenerateImageButton from "./MeuralGenerateImageButton";
import MeuralPromptDisplay from "./MeuralPromptDisplay";
import MeuralShowInfoButton from "./MeuralShowInfoButton";

const MeuralPageComponent = ({ back, device }) => (
	<div>
		<div className="background"></div>
		<HeaderComponent back={back} name={"Meural Control"} />
		<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start room-content">
			<MeuralSourceButton device={device} />
			<MeuralPromptDisplay device={device} />
			<MeuralOnOffButton key={device} device={device} />
			<MeuralPreviousButton key={"previous"} device={device} />
			<MeuralNextButton key={"next"} device={device} />
			<MeuralGenerateImageButton key={"generate"} device={device} />
			<MeuralShowInfoButton device={device} />
		</div>
	</div>
);

export default MeuralPageComponent;
