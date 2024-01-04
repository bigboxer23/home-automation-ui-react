import React from "react";
import { Button } from "react-bootstrap";
import { isDeviceOn } from "../room/RoomButton";

export default function FrontPorchColorButton(props) {
	const getIconStyle = function (name) {
		//Pride
		const mdi = "mdi ";
		switch (name) {
			case "Pride":
				return mdi + "mdi-looks";
			case "Christmas":
				return mdi + "mdi-forest";
			case "Valentines":
				return mdi + "mdi-heart-outline";
			case "Halloween":
				return mdi + "mdi-halloween";
			case "Thanksgiving":
				return mdi + "mdi-turkey";
			case "Retro":
				return mdi + "mdi-lamps";
			case "Easter":
				return mdi + "mdi-rabbit-variant-outline";
			case "4th of July":
				return mdi + "mdi-firework";
			case "Normal":
				return mdi + "mdi-lightbulb-group-off-outline";
		}
		return mdi + "mdi-lightbulb-group-outline";
	};

	const getButtonStyle = function (device) {
		return isDeviceOn(device) ? "success" : "default";
	};

	return (
		<div>
			<Button
				onClick={() => props.handleClick(props.device.id)}
				variant={getButtonStyle(props.device)}
				size="lg"
				className={"mb-3 m-1 position-relative d-flex justify-content-center"}
			>
				<i className={getIconStyle(props.device.name)} />
				<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">
					{props.device.name}
				</div>
			</Button>
		</div>
	);
}
