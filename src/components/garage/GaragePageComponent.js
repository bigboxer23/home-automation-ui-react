import React from 'react'
import HeaderComponent from "../HeaderComponent"
import {getAutoCloseButtonStyle, getAutoCloseButtonText, getHeader} from "../../containers/GaragePage";
import RoomButton from "../room/RoomButton";
import LightComponent from "../room/LightComponent";
import {getRoomDimLevel} from "../../containers/RoomPage";
import {ReactBootstrapSlider} from "react-bootstrap-slider";
import GarageAutoCloseButton from "./GarageAutoCloseButton";

const GaragePageComponent = ({back, room, sliderChange, slideStop, setDeviceStatus, autoCloseClickHandler}) => (
		<div>
			<HeaderComponent back={back} name={getHeader(room)}/>
			<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">
				<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">
					<GarageAutoCloseButton onClick={autoCloseClickHandler} buttonText={getAutoCloseButtonText(room)} class={getAutoCloseButtonStyle(room)}/>
					<div className="form-group w-100">
						<label>Overall Room</label>
						<div className="p-2 d-flex btn-group btn-group-toggle justify-content-center">
							<ReactBootstrapSlider value={getRoomDimLevel(room)}
							                      change={sliderChange}
							                      slideStop={(event) => slideStop(event.target.value, room.id)}
							                      max={100}
							                      min={0}
							                      tooltip={"show"}/>
						</div>
					</div>
				</div>
			</div>
			{room.devices.map(device => RoomButton.isLight(device) ? <LightComponent key={device.name} device={device} sliderChange={sliderChange} slideStop={slideStop} setDeviceStatus={setDeviceStatus}/> : "")}

		</div>
);

export default GaragePageComponent