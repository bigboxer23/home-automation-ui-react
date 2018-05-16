import React from "react";
import {ReactBootstrapSlider} from "react-bootstrap-slider";
import RoomButton from "./RoomButton";

const LightComponent = ({device, sliderChange, slideStop, setDeviceStatus}) => {
		if (RoomButton.isFan(device))
		{
			return <div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">
						<div className="form-group w-100">
							<label>{device.name}</label>
							<div className="w-100 d-flex btn-group btn-group-toggle">
								<label className={getFanStyling("1", device.status)} onClick={() => setDeviceStatus(device.id, true)}>On</label>
								<label className={getFanStyling("0", device.status)} onClick={() => setDeviceStatus(device.id, false)}>Off</label>
							</div>
						</div>
					</div>
		}
		return <div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">
			<div className="form-group w-100">
				<label>{device.name}</label>
				<div className="d-flex btn-group btn-group-toggle justify-content-center">
					<ReactBootstrapSlider value={parseInt(device.level, 10)}
					                      change={sliderChange}
					                      slideStop={(event) => slideStop(event.target.value, device.id, "Device")}
					                      max={100}
					                      min={0}
					                      tooltip={"show"}/>
				</div>
			</div>
		</div>;
};


const getFanStyling = (fanOption, status) =>
{
	return "btn btn-secondary w-100" + (fanOption === status ? " active" : "");
};

export default LightComponent;