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
		<div className="tw:p-2 tw:w-full tw:h-full tw:flex tw:flex-wrap tw:justify-center tw:content-start room-content">
			<div className={"tw:w-full tw:flex tw:flex-col"}>
				<div className={"tw:ps-4 tw:pe-4 tw:mb-2 MuiToggleButtonGroup-root"}>
					<TextareaAutosize
						onKeyUp={handleKeyUp}
						autoFocus
						id="creationPrompt"
						placeholder="Enter prompt to generate image from"
						className={"tw:pt-6 tw:w-full prompt-textarea"}
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
