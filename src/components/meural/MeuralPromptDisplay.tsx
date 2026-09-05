import React from "react";
import { bindActionCreators } from "redux";
import { push } from "../../utils/navigation";
import { connect } from "react-redux";
import AppButton from "../ui/AppButton";
import type { AppDispatch, Device } from "../../types";

interface MeuralPromptDisplayProps {
	device: Device | undefined;
	changePage: (event: React.MouseEvent) => void;
}

function MeuralPromptDisplay(
	props: MeuralPromptDisplayProps,
): React.ReactElement {
	const getClassnames = (status: string | undefined): string => {
		return (
			// `group` lets the chevron below darken on hover/active, which used
			// to be `.meural-prompt-display:hover .mdi-chevron-right`.
			"group relative flex flex-col justify-center w-full" +
			("0" === status || "4" === status ? " hidden" : " mb-1")
		);
	};

	const getPrompt = (): string => {
		let raw = props.device?.temperature;
		return raw === undefined ? "" : JSON.parse(String(raw)).prompt;
	};

	return (
		<AppButton
			onClick={props.changePage}
			size="panel"
			className={getClassnames(props.device?.status)}
		>
			<div className={"text-black/60 flex items-center"}>
				<div>
					<div className={"mb-2 text-black/60 font-bold"}>Prompt</div>
					{getPrompt()}
				</div>
				<div
					className={
						"mdi mdi-chevron-right mdi-24px " +
						"group-hover:text-black group-active:text-black " +
						"group-hover:before:font-black"
					}
				/>
			</div>
		</AppButton>
	);
}

const mapDispatchToProps = (dispatch: AppDispatch) =>
	bindActionCreators(
		{
			changePage: (event: React.MouseEvent) => {
				event.stopPropagation();
				return push("/Meural/prompt");
			},
		},
		dispatch,
	);

export default connect(null, mapDispatchToProps)(MeuralPromptDisplay);
