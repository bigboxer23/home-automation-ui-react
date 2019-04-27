import React from "react";
import {getBatteryContent, getBatteryStyle} from "../../containers/RoomPage";

const MotionSensorComponent = ({device, style = ""}) => {
		return <div className={style + " p-2 form-group w-100 d-flex"}>
				<label className="flex-grow-1">{device.name.replace(" Battery", "")}</label>
				<div className="temp-display pr-1 pl-1 d-flex align-items-center" style={getBatteryStyle(device)}>{getBatteryContent(device)}</div>
			</div>
};

export default MotionSensorComponent;