import React from "react";
import {getBatteryStyle} from "../../containers/RoomPage";

const MotionSensorComponent = ({device}) => {
		return <div className="p-2 form-group w-100 d-flex">
				<label className="flex-grow-1">{device.name.replace(" Battery", "")}</label>
				<div className="tempDisplay pr-1 pl-1 d-flex align-items-center" style={getBatteryStyle(device)}>{device.level}%</div>
			</div>
};

export default MotionSensorComponent;