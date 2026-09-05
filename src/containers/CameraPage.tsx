import React from "react";
import { connect } from "react-redux";
import { push } from "../utils/navigation";
import { bindActionCreators } from "redux";
import type { AppDispatch } from "../types";
import CameraComponent from "../components/CameraComponent";

interface CameraPageProps {
	[key: string]: any;
}

class CameraPage extends React.Component<CameraPageProps> {
	render() {
		return <CameraComponent {...(this.props as any)} />;
	}
}

let intervalId: ReturnType<typeof setInterval> | null = null;

const initializeIframe = function (iframe: HTMLIFrameElement): void {
	if (intervalId == null) {
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

const mapDispatchToProps = (dispatch: AppDispatch) =>
	bindActionCreators(
		{
			back: () => push("/Scenes"),
			load: (o: HTMLIFrameElement) => () => initializeIframe(o),
			getSource: () => () =>
				window.location.pathname === "/Security"
					? "/FrontDoor"
					: "/GrowPi/index.html",
			getName: () => () =>
				window.location.pathname === "/Security"
					? "Front Door Security"
					: "Grow Tent",
		},
		dispatch,
	);

export default connect(null, mapDispatchToProps)(CameraPage);
