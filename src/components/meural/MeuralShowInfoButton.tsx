import React from "react";
import { Button } from "react-bootstrap";
import { hideInfo, showInfo } from "../../actions";
import type { Device } from "../../types";

interface MeuralShowInfoButtonProps {
	device: Device | undefined;
}

export default function MeuralShowInfoButton(
	props: MeuralShowInfoButtonProps,
): React.ReactElement {
	const shouldDisplay = (status: string | undefined): string => {
		return (
			"m-1 position-relative d-flex justify-content-center" +
			("0" === status ? " d-none" : "")
		);
	};

	return (
		<div>
			<Button
				onClick={showInfo}
				variant=""
				size="lg"
				className={shouldDisplay(props.device?.status)}
			>
				<i className="mdi mdi-information-outline" />
				<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">
					Toggle Artwork Info
				</div>
			</Button>
		</div>
	);
}
