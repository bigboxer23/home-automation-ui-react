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
	const className =
		(style || styleName) + " tw:p-2 tw:w-full tw:flex light_slider tw:mb-2";
	return (
		<div className={className}>
			<label className="tw:grow tw:items-center tw:ms-2 tw:mt-2 tw:mb-2">
				{device.name.replace(" Battery", "")}
			</label>
			<div
				className="temp-display tw:pe-4 tw:ps-4 tw:flex tw:items-center tw:me-2"
				style={getBatteryStyle(device)}
			>
				{getBatteryContent(device)}
			</div>
		</div>
	);
};

export default MotionSensorComponent;
