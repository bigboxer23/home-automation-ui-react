import React from "react";
import { connect } from "react-redux";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import MeuralPromptPageComponent from "../components/meural/MeuralPromptPageComponent";
import { mapStateToProps } from "./MeuralPage";
import { updateOpenAIPrompt } from "../actions";

interface MeuralPromptPageProps {
	[key: string]: any;
}

class MeuralPromptPage extends React.Component<MeuralPromptPageProps> {
	render() {
		return <MeuralPromptPageComponent {...(this.props as any)} />;
	}
}

const handleClose = (dispatch: any): void => {
	let element = document.getElementById("creationPrompt") as HTMLInputElement;
	if (element && element.value != null && element.value.length > 0) {
		updateOpenAIPrompt(element.value);
		dispatch(push("/Meural"));
	}
};

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			back: () => push("/Meural"),
			handleKeyUp: (event: React.KeyboardEvent) => (dispatch: any) => {
				if (event.key === "Enter") {
					handleClose(dispatch);
				}
			},
			handleClick: () => (dispatch: any) => handleClose(dispatch),
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(MeuralPromptPage);
