import React from "react";
import { Button } from "react-bootstrap";
import { previousMeuralImage } from "../../actions";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import type { AlertProps } from "@mui/material/Alert";
import type { Device } from "../../types";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	},
);

interface MeuralPreviousButtonProps {
	device: Device | undefined;
}

export default function MeuralPreviousButton(
	props: MeuralPreviousButtonProps,
): React.ReactElement {
	const [open, setOpen] = React.useState<boolean>(false);

	const handleClick = (): void => {
		setOpen(true);
		previousMeuralImage();
	};

	const shouldDisplay = (status: string | undefined): string => {
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
