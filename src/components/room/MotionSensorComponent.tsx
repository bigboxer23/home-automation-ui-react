import React from "react";
import type { Device } from "../../types";
import { getBatteryContent, getBatteryStyle } from "../../containers/RoomPage";

interface MotionSensorComponentProps {
	device: Device;
	style?: string;
	styleName?: string;
}

const MotionSensorComponent: React.FC<MotionSensorComponentProps> = ({
	device,
	style = "",
	styleName = "",
}) => {
	const className = (style || styleName) + " p-2 w-full flex light_slider mb-2";
	return (
		<div className={className}>
			<label className="grow items-center ms-2 mt-2 mb-2">
				{device.name.replace(" Battery", "")}
			</label>
			<div
				className="temp-display pe-4 ps-4 flex items-center me-2"
				style={getBatteryStyle(device)}
			>
				{getBatteryContent(device)}
			</div>
		</div>
	);
};

export default MotionSensorComponent;
