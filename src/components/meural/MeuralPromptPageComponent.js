import React from "react";
import HeaderComponent from "../HeaderComponent";
import { TextareaAutosize } from "@mui/material";
import { Button } from "react-bootstrap";

const MeuralPromptPageComponent = ({ back, handleKeyUp, handleClick }) => (
	<div>
		<div className="background"></div>
		<HeaderComponent back={back} name={"Meural Control"} />
		<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start room-content">
			<div className={"w-100 d-flex flex-column"}>
				<div className={"ps-3 pe-3 mb-2 MuiToggleButtonGroup-root"}>
					<TextareaAutosize
						onKeyUp={handleKeyUp}
						autoFocus
						margin="normal"
						id="creationPrompt"
						placeholder="Enter prompt to generate image from"
						type="text"
						fullWidth
						variant="standard"
						className={"pt-4 w-100 prompt-textarea"}
					/>
				</div>
				<Button onClick={handleClick}>Create New Image</Button>
			</div>
		</div>
	</div>
);

export default MeuralPromptPageComponent;
