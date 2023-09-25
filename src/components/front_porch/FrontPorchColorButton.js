import React from "react";
import { Button } from "react-bootstrap";
import { isDeviceOn } from "../room/RoomButton";

const FrontPorchColorButton = (props) => (
	<div>
		<Button
			onClick={() => props.handleClick(props.device.id)}
			variant={getButtonStyle(props.device)}
			size="lg"
			className={"mb-3 m-1 position-relative d-flex justify-content-center"}
		>
			<i className="mdi mdi-lightbulb-group-outline" />
			<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">
				{props.device.name}
			</div>
		</Button>
	</div>
);

const getButtonStyle = function (device) {
	return isDeviceOn(device) ? "success" : "default";
};
export default FrontPorchColorButton;
