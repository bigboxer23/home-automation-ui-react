import React from "react";
import { Button } from 'react-bootstrap'
import MuiAlert from "@mui/material/Alert";
import {Snackbar} from "@mui/material";

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

	return (
			<div>
				<Button onClick={handleClick} variant="" size="lg" className={shouldDisplay(props.device?.status)}>
					<i className="mdi mdi-message-image-outline"/>
					<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">Image from Prompt</div>
				</Button>
				<Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
					<Alert onClose={() => setOpen(false)} severity="info" sx={{ width: '100%' }}>
						Creating Image from Prompt...
					</Alert>
				</Snackbar>
			</div>
	);
}