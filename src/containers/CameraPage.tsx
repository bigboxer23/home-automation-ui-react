import React from "react";
import { connect } from "react-redux";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import type { AppDispatch } from "../types";
import CameraComponent from "../components/CameraComponent";

type CameraPageProps = React.ComponentProps<typeof CameraComponent>;

class CameraPage extends React.Component<CameraPageProps> {
	render() {
		return <CameraComponent {...this.props} />;
	}
}

let intervalId: ReturnType<typeof setInterval> | null = null;

// React hands a ref callback null when the element goes away, and the
// interval would then dereference it on its next tick.
const initializeIframe = function (iframe: HTMLIFrameElement | null): void {
	if (iframe != null && intervalId == null) {
		intervalId = setInterval(resizeImgContent, 250, iframe);
	}
};

const resizeImgContent = function (iframe: HTMLIFrameElement): void {
	if (iframe.contentDocument == null) {
		clearInterval(intervalId!);
		intervalId = null;
		return;
	}
	if (iframe.contentDocument.getElementsByTagName("img").length > 0) {
		iframe.contentDocument.getElementsByTagName("img")[0].style.width = "100%";
	}
};

// `load`, `getSource` and `getName` are plain functions, not actions. They
// used to be routed through bindActionCreators as thunks that dispatched
// nothing and returned a value; they are handed to the component directly
// now. The object is built once so the ref callback keeps its identity.
const staticProps = {
	load: initializeIframe,
	getSource: (): string =>
		window.location.pathname === "/Security"
			? "/FrontDoor"
			: "/GrowPi/index.html",
	getName: (): string =>
		window.location.pathname === "/Security"
			? "Front Door Security"
			: "Grow Tent",
};

const mapStateToProps = () => staticProps;

const mapDispatchToProps = (dispatch: AppDispatch) =>
	bindActionCreators({ back: () => push("/Scenes") }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage);
