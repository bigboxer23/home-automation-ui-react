import React from "react";
import { bindActionCreators } from "redux";
import { push } from "../../utils/navigation";
import { connect } from "react-redux";
import AppButton from "../ui/AppButton";
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
			"meural-prompt-display tw:p-4 tw:relative tw:flex tw:justify-center tw:w-full tw:relative tw:flex tw:flex-col tw:justify-center" +
			("0" === status || "4" === status ? " tw:hidden" : " tw:mb-1")
		);
	};

	const getPrompt = (): string => {
		let raw = props.device?.temperature;
		return raw === undefined ? "" : JSON.parse(raw as any).prompt;
	};

	return (
		<AppButton
			onClick={props.changePage}
			size="lg"
			className={getClassnames(props.device?.status)}
		>
			<div className={"meural-source-button-label tw:flex tw:items-center"}>
				<div>
					<div className={"tw:mb-2 meural-source-button-label tw:font-bold"}>
						Prompt
					</div>
					{getPrompt()}
				</div>
				<div className={"mdi mdi-chevron-right mdi-24px position-inherit"} />
			</div>
		</AppButton>
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
