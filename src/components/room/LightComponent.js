import React from "react";
import RoomButton from "./RoomButton";
import IOSSlider from "../ui/IOSSlider";
import IOSSwitch from "../ui/IOSSwitch";

export default function LightComponent({device, sliderChange, slideStop, setDeviceStatus}) {
	if (RoomButton.isFan(device))
		{
			return <div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start light_slider mb-2">
						<div className="form-group w-100 mt-2 mb-2">
							<div className="w-100 d-flex"><label className="ms-4 w-100">{device.name}</label>
								<IOSSwitch className="me-2" checked={device.level > 0} onChange={(event) => setDeviceStatus(device.id, event.target.checked)}/></div>
						</div>
					</div>
		}
		return (<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start light_slider mb-2">
			<div className="form-group w-100">
				<div className="w-100 d-flex"><label className="ms-4 w-100">{device.name}</label>
					<IOSSwitch className="me-2" checked={device.level > 0} onChange={(event) => setDeviceStatus(device.id, event.target.checked)}/></div>
				<div className=" d-flex btn-group btn-group-toggle justify-content-center">
					<IOSSlider
							value={parseInt(device.level, 10)}
							onChange={(event, newValue) => sliderChange(newValue, device.id)}
							onChangeCommitted={(event, newValue) => slideStop(newValue, device.id)}
							valueLabelDisplay={"auto"}
					        min={0}
					        max={100}/>
				</div>
			</div>
		</div>);
};
