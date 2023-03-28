import React from "react";
import { Button } from "react-bootstrap";
import { previousMeuralImage } from "../../actions";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MeuralPreviousButton(props) {
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
		previousMeuralImage();
	};

	const shouldDisplay = (status) => {
		return (
			"m-1 position-relative d-flex justify-content-center" +
			("0" === status || "4" === status ? "" : " d-none")
		);
	};

	return (
		<div>
			<Button
				onClick={handleClick}
				variant=""
				size="lg"
				className={shouldDisplay(props.device?.status)}
			>
				<i className="mdi mdi-image-move flip-horizontal" />
				<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">
					Previous Image
				</div>
			</Button>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={() => setOpen(false)}
			>
				<Alert
					onClose={() => setOpen(false)}
					severity="info"
					sx={{ width: "100%" }}
				>
					Fetching Previous Image
				</Alert>
			</Snackbar>
		</div>
	);
}
