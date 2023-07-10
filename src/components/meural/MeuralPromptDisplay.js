import React from "react";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

function MeuralPromptDisplay(props) {
	const getClassnames = (status) => {
		return (
			"meural-prompt-display p-3 position-relative d-flex justify-content-center w-100 position-relative d-flex flex-column justify-content-center" +
			("0" === status || "4" === status ? " d-none" : " mb-1")
		);
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
						Active Prompt
					</div>
					{props.device?.temperature}
				</div>
				<div className={"mdi mdi-chevron-right mdi-24px position-inherit"} />
			</div>
		</Button>
	);
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			changePage: (event) => (dispatch) => {
				event.stopPropagation();
				dispatch(push("/Meural/prompt"));
			},
		},
		dispatch,
	);

export default connect(null, mapDispatchToProps)(MeuralPromptDisplay);
