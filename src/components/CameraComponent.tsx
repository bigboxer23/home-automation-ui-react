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
		{/* oxlint-disable-next-line iframe-missing-sandbox -- the camera page is
		    same-origin by design: `initializeIframe` reaches into contentDocument
		    to size the image, which a sandbox attribute would block. */}
		<iframe
			className={"w-full h-[960px] border-0 room-content"}
			src={"" + getSource()}
			ref={load}
		></iframe>
	</div>
);

export default CameraComponent;
