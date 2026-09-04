import React from "react";
import type { Room } from "../../types";
import FrontPorchColorButton from "./FrontPorchColorButton";
import FrontPorchHueSceneButton from "./FrontPorchHueSceneButton";

interface FrontPorchColorComponentProps {
	rooms: Room[];
	handleClick: (id: string) => void;
	handleHueSceneClick: (id: string, deviceId: string) => void;
}

export default function FrontPorchColorComponent({
	rooms,
	handleClick,
	handleHueSceneClick,
}: FrontPorchColorComponentProps) {
	const getOpenHabScenes = (rooms: Room[]) => {
		return rooms
			.find((room) => room.name === "Front Porch Colors")!
			.devices.filter((device) => device.id !== "FrontPorchHueScene");
	};

	const getHueScenes = (rooms: Room[]) => {
		const status = rooms
			.find((room) => room.name === "Front Porch Colors")!
			.devices.find((device) => device.id === "FrontPorchHueScene");
		return rooms
			.find((room) => room.name === "Front Porch")!
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
			<div className="tw:p-2 tw:w-full tw:h-full tw:flex tw:flex-wrap tw:justify-center tw:content-start front-porch-color">
				<label className="tw:ms-4 tw:mb-4 tw:w-full scenes-label">
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
