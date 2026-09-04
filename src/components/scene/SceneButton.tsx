import React from "react";
import AppButton from "../ui/AppButton";
import type { Room } from "../../types";

interface SceneButtonProps {
	room: Room;
	handleClick: (id: string, verb: string) => void;
}

const SceneButton: React.FC<SceneButtonProps> = (props) => (
	<div>
		<AppButton
			onClick={() => props.handleClick(props.room.id, "ON")}
			size="lg"
			className={"mb-4 m-1 relative flex justify-center"}
		>
			<i className="mdi mdi-lightbulb-group-outline" />
			<div className="absolute bottom w-full m-2 ps-2 pe-2">
				{props.room.name} On
			</div>
		</AppButton>
		<AppButton
			onClick={() => props.handleClick(props.room.id, "OFF")}
			size="lg"
			className={"m-1 relative flex justify-center"}
		>
			<i className="mdi mdi-lightbulb-group-off-outline" />
			<div className="absolute bottom w-full m-2 ps-2 pe-2">
				{props.room.name} Off
			</div>
		</AppButton>
	</div>
);

export default SceneButton;
