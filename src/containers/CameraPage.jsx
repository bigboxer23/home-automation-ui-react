import React from "react";
import { connect } from "react-redux";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import CameraComponent from "../components/CameraComponent";

class CameraPage extends React.Component {
	render() {
		return <CameraComponent {...this.props} />;
	}
}

let intervalId = null;

const initializeIframe = function (iframe) {
	if (intervalId == null) {
		intervalId = setInterval(resizeImgContent, 250, iframe);
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
			back: () => push("/Scenes"),
			load: (o) => (dispatch) => initializeIframe(o),
			getSource: () => (dispatch) =>
				window.location.pathname === "/Security"
					? "/FrontDoor"
					: "/GrowPi/index.html",
			getName: () => (dispatch) =>
				window.location.pathname === "/Security"
					? "Front Door Security"
					: "Grow Tent",
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage);
