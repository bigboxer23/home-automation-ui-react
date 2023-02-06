import React from "react";
import { Button } from "react-bootstrap";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";

import { updateOpenAIPrompt } from "../../actions";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	topScrollPaper: {
		alignItems: "flex-start !important",
	},
	topPaperScrollBody: {
		verticalAlign: "top",
	},
});

export default function MeuralGenerateImageButton(props) {
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();

	const handleClick = () => {
		setOpen(true);
	};

	const shouldDisplay = (status) => {
		return (
			"m-1 position-relative d-flex justify-content-center" +
			("0" === status ? " d-none" : "")
		);
	};

	const handleClose = (value) => {
		if (value) {
			let value = document.getElementById("creationPrompt").value;
			if (value != null && value.length > 0) {
				updateOpenAIPrompt(value);
			}
		}
		setOpen(false);
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			handleClose(true);
		}
	};

	return (
		<div>
			<Button
				onClick={handleClick}
				variant=""
				size="lg"
				className={shouldDisplay(props.device?.status)}
			>
				<i className="mdi mdi-message-image-outline" />
				<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">
					Image from Prompt
				</div>
			</Button>
			<Dialog
				scroll="paper"
				classes={{
					scrollPaper: classes.topScrollPaper,
					paperScrollBody: classes.topPaperScrollBody,
				}}
				fullWidth
				open={open}
				onClose={() => handleClose(false)}
			>
				<DialogTitle>Create Image From Prompt</DialogTitle>
				<DialogContent>
					<TextField
						onKeyUp={handleKeyUp}
						autoFocus
						margin="normal"
						id="creationPrompt"
						label="Enter prompt to generate image from"
						type="text"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="text" onClick={() => handleClose(false)}>
						Cancel
					</Button>
					<Button onClick={() => handleClose(true)}>Create Image</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
