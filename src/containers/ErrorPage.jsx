import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ErrorPage extends React.Component {
	render() {
		return "Shouldn't get here";
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
