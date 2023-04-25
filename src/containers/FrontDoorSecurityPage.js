import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import FrontDoorSecurityComponent from "../components/FrontDoorSecurityComponent";

class FrontDoorSecurityPage extends React.Component {
	render() {
		return <FrontDoorSecurityComponent {...this.props} />;
	}
}

let intervalId = null;

const initializeIframe = function (iframe) {
	if (intervalId == null) {
		intervalId = setInterval(resizeImgContent, 300, iframe);
	}
};

const resizeImgContent = function (iframe) {
	if (iframe.contentDocument == null) {
		clearInterval(intervalId);
		intervalId = null;
		return;
	}
	if (iframe.contentDocument.getElementsByTagName("img").length > 0) {
		iframe.contentDocument.getElementsByTagName("img")[0].style = "width:100%";
	}
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			back: () => push("/"),
			load: (o) => (dispatch) => initializeIframe(o),
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FrontDoorSecurityPage);
