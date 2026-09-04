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
		<div className="p-2 w-full h-full flex flex-wrap justify-center content-start room-content">
			<div className={"w-full flex flex-col"}>
				<div className={"ps-4 pe-4 mb-2 MuiToggleButtonGroup-root"}>
					<TextareaAutosize
						onKeyUp={handleKeyUp}
						autoFocus
						id="creationPrompt"
						placeholder="Enter prompt to generate image from"
						className={"pt-6 w-full prompt-textarea"}
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
