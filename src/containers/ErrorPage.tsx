import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ErrorPage extends React.Component {
	render() {
		return "Shouldn't get here";
	}
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default connect(null, mapDispatchToProps)(ErrorPage);
