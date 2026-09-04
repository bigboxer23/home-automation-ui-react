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

	const getButtonStyle = function (device: Device): ButtonState {
		return isDeviceOn(device) ? "on" : "off";
	};

	return (
		<div>
			<AppButton
				onClick={() => props.handleClick(props.device.id)}
				state={getButtonStyle(props.device)}
				size="lg"
				className={"tw:mb-4 tw:m-1 tw:relative tw:flex tw:justify-center"}
			>
				<i className={getIconStyle(props.device.name)} />
				<div className="tw:absolute bottom tw:w-full tw:m-2 tw:ps-2 tw:pe-2">
					{props.device.name}
				</div>
			</AppButton>
		</div>
	);
}
