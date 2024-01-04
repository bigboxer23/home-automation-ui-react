import React from "react";
import FrontPorchColorButton from "./FrontPorchColorButton";
import FrontPorchHueSceneButton from "./FrontPorchHueSceneButton";

export default function FrontPorchColorComponent({
	rooms,
	handleClick,
	handleHueSceneClick,
}) {
	const getOpenHabScenes = (rooms) => {
		return rooms
			.find((room) => room.name === "Front Porch Colors")
			.devices.filter((device) => device.id !== "FrontPorchHueScene");
	};

	const getHueScenes = (rooms) => {
		const status = rooms
			.find((room) => room.name === "Front Porch Colors")
			.devices.find((device) => device.id === "FrontPorchHueScene");
		return rooms
			.find((room) => room.name === "Front Porch")
			.devices.filter((device) => {
				return device.category === "hc";
			})
			.filter((device) => {
				if (device.id == status?.level) {
					device.level = "ON";
				}
				return true;
			});
	};

	return (
		<div>
			<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start front-porch-color">
				<label className="ms-3 mb-3 w-100 scenes-label">
					Front Porch Scenes
				</label>
				{getOpenHabScenes(rooms).map((device) => (
					<FrontPorchColorButton
						key={device.name}
						device={device}
						handleClick={handleClick}
					/>
				))}
				{getHueScenes(rooms).map((device) => (
					<FrontPorchHueSceneButton
						key={device.id}
						device={device}
						handleClick={handleHueSceneClick}
					/>
				))}
			</div>
		</div>
	);
}
