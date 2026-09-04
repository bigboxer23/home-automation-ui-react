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
			"tw:m-1 tw:relative tw:flex tw:justify-center" +
			("0" === status ? " tw:hidden" : "")
		);
	};

	return (
		<div>
			<AppButton
				onClick={showInfo}
				size="lg"
				className={shouldDisplay(props.device?.status)}
			>
				<i className="mdi mdi-information-outline" />
				<div className="tw:absolute bottom tw:w-full tw:m-2 tw:ps-2 tw:pe-2">
					Toggle Artwork Info
				</div>
			</AppButton>
		</div>
	);
}
