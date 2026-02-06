import React from "react";
import HeaderComponent from "./HeaderComponent";

interface CameraComponentProps {
	back: () => void;
	load: React.Ref<HTMLIFrameElement>;
	getSource: () => string;
	getName: () => string;
}

const CameraComponent: React.FC<CameraComponentProps> = ({
	back,
	load,
	getSource,
	getName,
}) => (
	<div>
		<div className="background"></div>
		<HeaderComponent back={back} name={"" + getName()} />
		<iframe
			className={"security room-content"}
			src={"" + getSource()}
			ref={load}
		></iframe>
	</div>
);

export default CameraComponent;
