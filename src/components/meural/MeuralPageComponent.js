import React from "react";
import MeuralNextButton from "./MeuralNextButton";
import MeuralPreviousButton from "./MeuralPreviousButton";
import MeuralSourceButton from "./MeuralSourceButton";
import MeuralPromptDisplay from "./MeuralPromptDisplay";
import MeuralShowInfoButton from "./MeuralShowInfoButton";
import MeuralQualityButton from "./MeuralQualityButton";
import MeuralStyleButton from "./MeuralStyleButton";
import MeuralHeaderComponent from "./MeuralHeaderComponent";

const MeuralPageComponent = ({ back, device }) => (
	<div>
		<div className="background"></div>
		<MeuralHeaderComponent
			back={back}
			name={"Meural Control"}
			device={device}
		/>
		<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start room-content">
			<MeuralPreviousButton key={"previous"} device={device} />
			<MeuralNextButton key={"next"} device={device} />
			<MeuralShowInfoButton device={device} />
			<MeuralPromptDisplay device={device} />
			<MeuralSourceButton device={device} />
			<MeuralQualityButton device={device} />
			<MeuralStyleButton device={device} />
		</div>
	</div>
);

export default MeuralPageComponent;
