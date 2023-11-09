import { updateOpenAIQuality } from "../../actions";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

function MeuralQualityButton(props) {
	const getQuality = () => {
		let raw = props.device?.temperature;
		return raw === undefined ? "hd" : JSON.parse(raw).quality;
	};

	const getClassnames = (status) => {
		return (
			"meural-source-button pb-2" +
			("0" === status || "4" === status ? " d-none" : "")
		);
	};
	return (
		<div className={getClassnames(props.device?.status)}>
			<div className={"ms-3 meural-source-button-label fw-bold"}>Quality</div>
			<ToggleButtonGroup
				type="radio"
				name="quality"
				value={getQuality()}
				exclusive
				orientation={"vertical"}
				onChange={(e, value) => {
					if (value !== null) {
						updateOpenAIQuality(value);
					}
				}}
			>
				<ToggleButton
					disableRipple
					variant="secondary"
					name="quality"
					id="tbg-btn-2"
					className={"mdi mdi-check-circle"}
					value={"standard"}
				>
					Standard
				</ToggleButton>
				<ToggleButton
					disableRipple
					variant="secondary"
					name="quality"
					id="tbg-btn-3"
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
