import React from 'react'
import HeaderComponent from "../HeaderComponent"
import LightComponent from "./LightComponent";
import RoomButton from "./RoomButton";
import {getHeaderTitle, getRoomDimLevel, isMotionDevice} from "../../containers/RoomPage";
import {ReactBootstrapSlider} from "react-bootstrap-slider";
import MotionSensorComponent from "./MotionSensorComponent";

const RoomPageComponent = ({back, room, sliderChange, slideStop, setDeviceStatus}) => (
		<div className={"room_component"}>
			<HeaderComponent back={back} name={getHeaderTitle(room)}/>
			<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">
				<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start light_slider mb-2">
					<div className="form-group w-100">
						<label className="ml-3">Overall Room</label>
						<div className="pr-3 pl-3 d-flex btn-group btn-group-toggle justify-content-center">
							<ReactBootstrapSlider value={getRoomDimLevel(room)}
							                      change={sliderChange}
							                      slideStop={(event) => slideStop(event.target.value, room.id)}
							                      max={100}
							                      min={0}
							                      tooltip={"show"}/>
						</div>
					</div>
				</div>
				{room.devices
						.map(device =>
								RoomButton.isLight(device) ?
										<LightComponent key={device.name} device={device} sliderChange={sliderChange} slideStop={slideStop} setDeviceStatus={setDeviceStatus}/>
										: isMotionDevice(device) ?
										<MotionSensorComponent key={device.name} device={device} /> : "")}
			</div>
		</div>
);

export default RoomPageComponent