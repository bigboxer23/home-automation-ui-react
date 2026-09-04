import React from "react";
import AppButton from "../ui/AppButton";
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
		return "mb-4 m-1 relative flex justify-center"; /*+
			("4" === status ? " hidden" : "")*/
	};

	const getIconStyle = (status: string | undefined): string => {
		return "mdi mdi-image-" + ("1" === status ? "refresh-outline" : "move");
	};

	return (
		<div>
			<AppButton
				onClick={handleClick}
				size="lg"
				className={shouldDisplay(props.device?.status)}
			>
				<i className={getIconStyle(props.device?.status)} />
				<div className="absolute bottom w-full m-2 ps-2 pe-2">
					{generateButtonText(props.device?.status)}
				</div>
			</AppButton>
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
