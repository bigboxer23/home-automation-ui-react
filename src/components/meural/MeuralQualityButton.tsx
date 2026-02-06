import { updateOpenAIQuality } from "../../actions";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import type { Device } from "../../types";

interface MeuralQualityButtonProps {
	device: Device | undefined;
}

function MeuralQualityButton(
	props: MeuralQualityButtonProps,
): React.ReactElement {
	const getQuality = (): string => {
		let raw = props.device?.temperature;
		return raw === undefined ? "hd" : JSON.parse(raw as any).quality;
	};

	const getClassnames = (status: string | undefined): string => {
		return (
			"meural-source-button pt-3 pb-2" +
			("0" === status || "4" === status ? " d-none" : "")
		);
	};
	return (
		<div className={getClassnames(props.device?.status)}>
			<ToggleButtonGroup
				value={getQuality()}
				exclusive
				orientation={"vertical"}
				onChange={(e: React.MouseEvent<HTMLElement>, value: string | null) => {
					if (value !== null) {
						updateOpenAIQuality(value);
					}
				}}
			>
				<div className={"ms-3 meural-source-button-label fw-bold pt-3 pb-2"}>
					Quality
				</div>
				<ToggleButton
					disableRipple
					className={"mdi mdi-check-circle"}
					value={"standard"}
				>
					Standard
				</ToggleButton>
				<ToggleButton
					disableRipple
					className={"mdi mdi-check-circle"}
					value={"hd"}
				>
					HD
				</ToggleButton>
			</ToggleButtonGroup>
		</div>
	);
}

export default MeuralQualityButton;
