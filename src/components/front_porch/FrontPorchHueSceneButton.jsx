import React from "react";
import { Button } from "react-bootstrap";

export default function FrontPorchHueSceneButton(props) {
	const getIconStyle = function (name) {
		const mdi = "mdi ";
		switch (name) {
			case "Normal":
				return mdi + "mdi-lightbulb-group-off-outline";
		}
		return mdi + "mdi-lightbulb-group-outline";
	};
	const getButtonStyle = function (device) {
		return device.level === "ON" ? "success" : "default";
	};

	return (
		<div>
			<Button
				onClick={() => props.handleClick(props.device.id, "FrontPorchHueScene")}
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
