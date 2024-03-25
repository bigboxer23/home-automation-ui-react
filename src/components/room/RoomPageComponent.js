import React from "react";
import LightComponent from "./LightComponent";
import RoomButton from "./RoomButton";
import { isMotionDevice } from "../../containers/RoomPage";
import MotionSensorComponent from "./MotionSensorComponent";
import FrontPorchColorComponent from "../front_porch/FrontPorchColorsComponent";
import { RoomHeaderComponent } from "./RoomHeaderComponent";

const RoomPageComponent = ({
	back,
	room,
	sliderChange,
	slideStop,
	setDeviceStatus,
	rooms,
	handleFrontPorchClick,
}) => (
	<div className="room-component">
		<div className="background"></div>
		<RoomHeaderComponent
			back={back}
			room={room}
			setDeviceStatus={setDeviceStatus}
			sliderChange={sliderChange}
			slideStop={slideStop}
		/>
		<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start room-content">
			{room.devices.map((device) =>
				RoomButton.isLight(device) ? (
					<LightComponent
						key={device.name}
						device={device}
						sliderChange={sliderChange}
						slideStop={slideStop}
						setDeviceStatus={setDeviceStatus}
					/>
				) : isMotionDevice(device) ? (
					<MotionSensorComponent key={device.name} device={device} />
				) : (
					""
				),
			)}
		</div>
		{room.name === "Front Porch" ? (
			<FrontPorchColorComponent
				rooms={rooms}
				handleClick={handleFrontPorchClick}
				handleHueSceneClick={slideStop}
			/>
		) : (
			""
		)}
	</div>
);

export default RoomPageComponent;
