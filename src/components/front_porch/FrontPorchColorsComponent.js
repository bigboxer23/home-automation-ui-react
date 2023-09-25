import React from "react";
import FrontPorchColorButton from "./FrontPorchColorButton";

const FrontPorchColorComponent = ({ rooms, handleClick }) => (
	<div>
		<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start front-porch-color">
			<label className="ms-3 mb-3 w-100 scenes-label">Front Porch Scenes</label>
			{getDevices(rooms).map((device) => (
				<FrontPorchColorButton
					key={device.name}
					device={device}
					handleClick={handleClick}
				/>
			))}
		</div>
	</div>
);

const getDevices = (rooms) => {
	return rooms.find((room) => room.name === "Front Porch Colors").devices;
};

export default FrontPorchColorComponent;
