import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import MeuralPromptPageComponent from "../components/meural/MeuralPromptPageComponent";
import { mapStateToProps } from "./MeuralPage";
import { updateOpenAIPrompt } from "../actions";

class MeuralPromptPage extends React.Component {
	render() {
		return <MeuralPromptPageComponent {...this.props} />;
	}
}

const handleClose = (dispatch) => {
	let value = document.getElementById("creationPrompt").value;
	if (value != null && value.length > 0) {
		updateOpenAIPrompt(value);
		dispatch(push("/Meural"));
	}
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			back: () => push("/Meural"),
			handleKeyUp: (event) => (dispatch) => {
				if (event.key === "Enter") {
					handleClose(dispatch);
				}
			},
			handleClick: () => (dispatch) => handleClose(dispatch),
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(MeuralPromptPage);
