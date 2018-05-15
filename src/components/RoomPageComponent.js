import React from 'react'
import HeaderComponent from "./HeaderComponent"
import LightComponent from "./LightComponent";
import RoomButton from "./RoomButton";

const RoomPageComponent = ({back, room, sliderChange, slideStop, setDeviceStatus}) => (
		<div>
			<HeaderComponent back={back} name={room.name}/>

			<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">
				{room.devices.map(device => RoomButton.isLight(device) ? <LightComponent key={device.name} device={device} sliderChange={sliderChange} slideStop={slideStop} setDeviceStatus={setDeviceStatus}/> : "")}
			</div>
		</div>
);

export default RoomPageComponent