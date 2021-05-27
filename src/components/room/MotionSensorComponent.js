import React from "react";
import {getBatteryContent, getBatteryStyle} from "../../containers/RoomPage";

const MotionSensorComponent = ({device, style = ""}) => {
		return <div className={style + " p-2 form-group w-100 d-flex light_slider mb-2"}>
				<label className="flex-grow-1 align-items-center ml-2 mt-2">{device.name.replace(" Battery", "")}</label>
				<div className="temp-display pe-1 ps-1 d-flex align-items-center mr-2" style={getBatteryStyle(device)}>{getBatteryContent(device)}</div>
			</div>
};

export default MotionSensorComponent;