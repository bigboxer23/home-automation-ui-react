import React from "react";
import { bindActionCreators } from "redux";
import { push } from "../../utils/navigation";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import type { Device } from "../../types";

interface MeuralPromptDisplayProps {
	device: Device | undefined;
	changePage: (event: React.MouseEvent) => void;
}

function MeuralPromptDisplay(
	props: MeuralPromptDisplayProps,
): React.ReactElement {
	const getClassnames = (status: string | undefined): string => {
		return (
			"meural-prompt-display p-3 position-relative d-flex justify-content-center w-100 position-relative d-flex flex-column justify-content-center" +
			("0" === status || "4" === status ? " d-none" : " mb-1")
		);
	};

	const getPrompt = (): string => {
		let raw = props.device?.temperature;
		return raw === undefined ? "" : JSON.parse(raw as any).prompt;
	};

	return (
		<Button
			onClick={props.changePage}
			variant=""
			size="lg"
			className={getClassnames(props.device?.status)}
		>
			<div className={"meural-source-button-label d-flex align-items-center"}>
				<div>
					<div className={"mb-2 meural-source-button-label fw-bold"}>
						Prompt
					</div>
					{getPrompt()}
				</div>
				<div className={"mdi mdi-chevron-right mdi-24px position-inherit"} />
			</div>
		</Button>
	);
}

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			changePage: (event: React.MouseEvent) => (dispatch: any) => {
				event.stopPropagation();
				dispatch(push("/Meural/prompt"));
			},
		},
		dispatch,
	);

export default connect(null, mapDispatchToProps)(MeuralPromptDisplay);
