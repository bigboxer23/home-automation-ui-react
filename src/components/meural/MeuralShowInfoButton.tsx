import React from "react";
import AppButton from "../ui/AppButton";
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
			"m-1 relative flex justify-center" + ("0" === status ? " hidden" : "")
		);
	};

	return (
		<div>
			<AppButton
				onClick={showInfo}
				size="lg"
				className={shouldDisplay(props.device?.status)}
			>
				<i className="mdi tile-icon mdi-information-outline text-black/30" />
				<div className="absolute bottom-0 w-full m-2 ps-2 pe-2">
					Toggle Artwork Info
				</div>
			</AppButton>
		</div>
	);
}
