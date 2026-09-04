import React from "react";
import AppButton, { type ButtonState } from "../ui/AppButton";
import type { Device } from "../../types";

interface FrontPorchHueSceneButtonProps {
	device: Device;
	handleClick: (id: string, deviceId: string) => void;
}

export default function FrontPorchHueSceneButton(
	props: FrontPorchHueSceneButtonProps,
) {
	const getIconStyle = function (name: string): string {
		const mdi = "mdi ";
		switch (name) {
			case "Normal":
				return mdi + "mdi-lightbulb-group-off-outline";
		}
		return mdi + "mdi-lightbulb-group-outline";
	};
	const getButtonStyle = function (device: Device): ButtonState {
		return device.level === "ON" ? "on" : "off";
	};

	return (
		<div>
			<AppButton
				onClick={() => props.handleClick(props.device.id, "FrontPorchHueScene")}
				state={getButtonStyle(props.device)}
				size="lg"
				className={"mb-4 m-1 relative flex justify-center"}
			>
				<i className={getIconStyle(props.device.name)} />
				<div className="absolute bottom w-full m-2 ps-2 pe-2">
					{props.device.name}
				</div>
			</AppButton>
		</div>
	);
}
