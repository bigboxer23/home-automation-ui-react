import React from 'react'
import HeaderComponent from "../HeaderComponent"
import LightComponent from "./LightComponent";
import RoomButton from "./RoomButton";
import {ReactBootstrapSlider} from "react-bootstrap-slider";

const RoomPageComponent = ({back, room, sliderChange, slideStop, setDeviceStatus}) => (
		<div>
			<HeaderComponent back={back} name={room.name}/>
			<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">
				<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">
					<div className="form-group w-100">
						<label>Overall Room</label>
						<div className="d-flex btn-group btn-group-toggle justify-content-center">
							<ReactBootstrapSlider value={getRoomDimLevel(room)}
							                      change={sliderChange}
							                      slideStop={(event) => slideStop(event.target.value, room.id, "Room")}
							                      max={100}
							                      min={0}
							                      tooltip={"show"}/>
						</div>
					</div>
				</div>
				{room.devices.map(device => RoomButton.isLight(device) ? <LightComponent key={device.name} device={device} sliderChange={sliderChange} slideStop={slideStop} setDeviceStatus={setDeviceStatus}/> : "")}
			</div>
		</div>
);

export const getRoomDimLevel = (room) => {
	let level = 0;
	if (room != null)
	{
		room.devices
				.filter(device => device.level != null)
				.filter(device => RoomButton.isLight(device))
				.forEach(device =>
		{
			level = Math.max(level, parseInt(device.level, 10));
		});
	}
	return level;
};

export default RoomPageComponent