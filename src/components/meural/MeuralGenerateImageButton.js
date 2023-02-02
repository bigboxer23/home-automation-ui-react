import React from "react";
import { Button } from 'react-bootstrap'
import MuiAlert from "@mui/material/Alert";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField} from "@mui/material";
import {updateOpenAIPrompt} from "../../actions";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MeuralGenerateImageButton(props) {
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const shouldDisplay = (status) => {
		return "m-1 position-relative d-flex justify-content-center" + ("0" === status ? " d-none" : "");
	}

	const handleClose = (value) => {
		if (value)
		{
			let value = document.getElementById("creationPrompt").value;
			if (value != null && value.length > 0)
			{
				updateOpenAIPrompt(value);
			}
		}
		setOpen(false);
	};

	return (
			<div>
				<Button onClick={handleClick} variant="" size="lg" className={shouldDisplay(props.device?.status)}>
					<i className="mdi mdi-message-image-outline"/>
					<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">Image from Prompt</div>
				</Button>
				<Dialog fullWidth open={open} onClose={() => handleClose(false)}>
					<DialogTitle>Create Image From Prompt</DialogTitle>
					<DialogContent>
						<TextField
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
						<Button variant="text" onClick={() => handleClose(false)}>Cancel</Button>
						<Button onClick={() => handleClose(true)}>Create Image</Button>
					</DialogActions>
				</Dialog>
			</div>
	);
}