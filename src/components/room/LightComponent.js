import React from "react";
import {ReactBootstrapSlider} from "react-bootstrap-slider";
import RoomButton from "./RoomButton";

const LightComponent = ({device, sliderChange, slideStop, setDeviceStatus}) => {
		if (RoomButton.isFan(device))
		{
			return <div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start light_slider mb-2">
						<div className="form-group w-100">
							<label className="ml-4">{device.name}</label>
							<div className="w-100 d-flex btn-group btn-group-toggle pl-3 pr-3">
								<label className={getFanStyling("1", device.level)} onClick={() => setDeviceStatus(device.id, true)}>On</label>
								<label className={getFanStyling("0", device.level)} onClick={() => setDeviceStatus(device.id, false)}>Off</label>
							</div>
						</div>
					</div>
		}
		return <div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start light_slider mb-2">
			<div className="form-group w-100">
				<label className="ml-4">{device.name}</label>
				<div className="pr-3 pl-3 d-flex btn-group btn-group-toggle justify-content-center">
					<ReactBootstrapSlider value={parseInt(device.level, 10)}
					                      change={sliderChange}
					                      slideStop={(event) => slideStop(event.target.value, device.id)}
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