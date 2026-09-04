import { updateOpenAIStyle } from "../../actions";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import type { Device } from "../../types";

interface MeuralStyleButtonProps {
	device: Device | undefined;
}

function MeuralStyleButton(props: MeuralStyleButtonProps): React.ReactElement {
	const getStyle = (): string => {
		let raw = props.device?.temperature;
		return raw === undefined ? "hd" : JSON.parse(raw as any).style;
	};

	const getClassnames = (status: string | undefined): string => {
		return (
			"meural-source-button pt-4 pb-2" +
			("0" === status || "4" === status ? " hidden" : "")
		);
	};

	return (
		<div className={getClassnames(props.device?.status)}>
			<ToggleButtonGroup
				value={getStyle()}
				exclusive
				orientation={"vertical"}
				onChange={(e: React.MouseEvent<HTMLElement>, value: string | null) => {
					if (value !== null) {
						updateOpenAIStyle(value);
					}
				}}
			>
				<div className={"ms-4 meural-source-button-label font-bold pt-4 pb-2"}>
					Style
				</div>
				<ToggleButton
					disableRipple
					className={"mdi mdi-check-circle"}
					value={"natural"}
				>
					Natural
				</ToggleButton>
				<ToggleButton
					disableRipple
					className={"mdi mdi-check-circle"}
					value={"vivid"}
				>
					Vivid
				</ToggleButton>
			</ToggleButtonGroup>
		</div>
	);
}

export default MeuralStyleButton;
