import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import type { AppDispatch } from "../types";

class ErrorPage extends React.Component {
	render() {
		return "Shouldn't get here";
	}
}

const mapDispatchToProps = (dispatch: AppDispatch) =>
	bindActionCreators({}, dispatch);

export default connect(null, mapDispatchToProps)(ErrorPage);
