import React from "react";
import AppButton from "../ui/AppButton";
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
			"m-1 relative flex justify-center" +
			("0" === status || "4" === status ? "" : " hidden")
		);
	};

	return (
		<div>
			<AppButton
				onClick={handleClick}
				size="lg"
				className={shouldDisplay(props.device?.status)}
			>
				<i className="mdi mdi-image-move flip-horizontal" />
				<div className="absolute bottom w-full m-2 ps-2 pe-2">
					Previous Image
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
					Fetching Previous Image
				</Alert>
			</Snackbar>
		</div>
	);
}
