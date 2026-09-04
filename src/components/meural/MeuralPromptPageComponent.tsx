import React from "react";
import HeaderComponent from "../HeaderComponent";
import { TextareaAutosize } from "@mui/material";
import AppButton from "../ui/AppButton";

interface MeuralPromptPageComponentProps {
	back: () => void;
	handleKeyUp: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	handleClick: () => void;
}

const MeuralPromptPageComponent: React.FC<MeuralPromptPageComponentProps> = ({
	back,
	handleKeyUp,
	handleClick,
}) => (
	<div>
		<div className="background"></div>
		<HeaderComponent back={back} name={"Meural Control"} />
		<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start room-content">
			<div className={"w-100 d-flex flex-column"}>
				<div className={"ps-3 pe-3 mb-2 MuiToggleButtonGroup-root"}>
					<TextareaAutosize
						onKeyUp={handleKeyUp}
						autoFocus
						id="creationPrompt"
						placeholder="Enter prompt to generate image from"
						className={"pt-4 w-100 prompt-textarea"}
					/>
				</div>
				<AppButton onClick={handleClick} state="primary">
					Create New Image
				</AppButton>
			</div>
		</div>
	</div>
);

export default MeuralPromptPageComponent;
