import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import type { RootState } from "../types";

class ErrorPage extends React.Component {
	render() {
		return "Shouldn't get here";
	}
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
