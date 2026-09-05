import React from "react";
import AppButton, { type ButtonState } from "../ui/AppButton";
import type { Device } from "../../types";
import { isDeviceOn } from "../room/RoomUtils";

interface FrontPorchColorButtonProps {
	device: Device;
	handleClick: (id: string) => void;
}

export default function FrontPorchColorButton(
	props: FrontPorchColorButtonProps,
) {
	const getIconStyle = function (name: string): string {
		//Pride
		const mdi = "mdi tile-icon text-black/30 [[data-state=on]_&]:text-accent ";
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

	const getButtonStyle = function (device: Device): ButtonState {
		return isDeviceOn(device) ? "on" : "off";
	};

	return (
		<div>
			<AppButton
				onClick={() => props.handleClick(props.device.id)}
				state={getButtonStyle(props.device)}
				size="lg"
				className={"mb-4 m-1 relative flex justify-center"}
			>
				<i className={getIconStyle(props.device.name)} />
				<div className="absolute bottom-0 w-full m-2 ps-2 pe-2">
					{props.device.name}
				</div>
			</AppButton>
		</div>
	);
}
