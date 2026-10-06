import React from "react";
import HeaderComponent from "./HeaderComponent";

interface CameraComponentProps {
	back: () => void;
	load: React.Ref<HTMLIFrameElement>;
	getSource: () => string;
	getName: () => string;
	isStream: () => boolean;
}

const CameraComponent: React.FC<CameraComponentProps> = ({
	back,
	load,
	getSource,
	getName,
	isStream,
}) => (
	<div>
		<div className="background"></div>
		<HeaderComponent back={back} name={"" + getName()} />
		{isStream() ? (
			// Browsers play an MJPEG stream natively in an <img>, sized to the
			// screen width at the stream's own aspect ratio.
			<img
				className={"block w-full h-auto room-content"}
				src={"" + getSource()}
				alt={"" + getName()}
			/>
		) : (
			<>
				{/* oxlint-disable-next-line iframe-missing-sandbox -- the camera page is
				    same-origin by design: `initializeIframe` reaches into contentDocument
				    to size the image, which a sandbox attribute would block. */}
				<iframe
					className={"w-full h-[960px] border-0 room-content"}
					src={"" + getSource()}
					ref={load}
				></iframe>
			</>
		)}
	</div>
);

export default CameraComponent;
