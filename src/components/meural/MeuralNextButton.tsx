import React from "react";
import { Button } from "react-bootstrap";
import { nextMeuralImage } from "../../actions";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import type { AlertProps } from "@mui/material/Alert";
import type { Device } from "../../types";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	},
);

interface MeuralNextButtonProps {
	device: Device | undefined;
}

export default function MeuralNextButton(
	props: MeuralNextButtonProps,
): React.ReactElement {
	const [open, setOpen] = React.useState<boolean>(false);

	const handleClick = (): void => {
		setOpen(true);
		nextMeuralImage();
	};

	const generateButtonText = (status: string | undefined): string => {
		return "1" === status ? "Generate New Image" : "Next Image";
	};

	const generateAlertText = (status: string | undefined): string => {
		return "1" === status
			? "Started Generating New Image"
			: "Fetching Next Image";
	};

	const shouldDisplay = (status: string | undefined): string => {
		return "mb-3 m-1 position-relative d-flex justify-content-center" /*+
			("4" === status ? " d-none" : "")*/;
	};

	const getIconStyle = (status: string | undefined): string => {
		return "mdi mdi-image-" + ("1" === status ? "refresh-outline" : "move");
	};

	return (
		<div>
			<Button
				onClick={handleClick}
				variant=""
				size="lg"
				className={shouldDisplay(props.device?.status)}
			>
				<i className={getIconStyle(props.device?.status)} />
				<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">
					{generateButtonText(props.device?.status)}
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
					{generateAlertText(props.device?.status)}
				</Alert>
			</Snackbar>
		</div>
	);
}
