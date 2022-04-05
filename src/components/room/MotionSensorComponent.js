import React from "react";
import {getBatteryContent, getBatteryStyle} from "../../containers/RoomPage";

const MotionSensorComponent = ({device, style = ""}) => {
		return <div className={style + " p-2 form-group w-100 d-flex light_slider mb-2"}>
				<label className="flex-grow-1 align-items-center ms-4 mt-2 mb-2">{device.name.replace(" Battery", "")}</label>
				<div className="temp-display pe-3 ps-3 d-flex align-items-center me-2" style={getBatteryStyle(device)}>{getBatteryContent(device)}</div>
			</div>
};

export default MotionSensorComponent;