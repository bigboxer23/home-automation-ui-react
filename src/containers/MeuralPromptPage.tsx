import React from "react";
import { connect } from "react-redux";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import MeuralPromptPageComponent from "../components/meural/MeuralPromptPageComponent";
import { mapStateToProps } from "./MeuralPage";
import { updateOpenAIPrompt } from "../actions";
import type { AppDispatch, AppThunk } from "../types";

interface MeuralPromptPageProps {
	[key: string]: any;
}

class MeuralPromptPage extends React.Component<MeuralPromptPageProps> {
	render() {
		return <MeuralPromptPageComponent {...(this.props as any)} />;
	}
}

const handleClose = (): AppThunk => (dispatch) => {
	let element = document.getElementById("creationPrompt") as HTMLInputElement;
	if (element && element.value != null && element.value.length > 0) {
		updateOpenAIPrompt(element.value);
		dispatch(push("/Meural"));
	}
};

const mapDispatchToProps = (storeDispatch: AppDispatch) =>
	bindActionCreators(
		{
			back: () => push("/Meural"),
			handleKeyUp:
				(event: React.KeyboardEvent): AppThunk =>
				(dispatch) => {
					if (event.key === "Enter") {
						dispatch(handleClose());
					}
				},
			handleClick: () => handleClose(),
		},
		storeDispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(MeuralPromptPage);
