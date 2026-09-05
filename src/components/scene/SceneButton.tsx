import React from "react";
import AppButton from "../ui/AppButton";
import type { Device } from "../../types";

interface SceneButtonProps {
	room: Device;
	handleClick: (id: string, verb: string) => void;
}

const SceneButton: React.FC<SceneButtonProps> = (props) => (
	<div>
		<AppButton
			onClick={() => props.handleClick(props.room.id, "ON")}
			size="lg"
			className={"mb-4 m-1 relative flex justify-center"}
		>
			<i className="mdi tile-icon mdi-lightbulb-group-outline text-black/30" />
			<div className="absolute bottom-0 w-full m-2 ps-2 pe-2">
				{props.room.name} On
			</div>
		</AppButton>
		<AppButton
			onClick={() => props.handleClick(props.room.id, "OFF")}
			size="lg"
			className={"m-1 relative flex justify-center"}
		>
			<i className="mdi tile-icon mdi-lightbulb-group-off-outline text-black/30" />
			<div className="absolute bottom-0 w-full m-2 ps-2 pe-2">
				{props.room.name} Off
			</div>
		</AppButton>
	</div>
);

export default SceneButton;
