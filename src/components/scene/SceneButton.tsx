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
			className={"tw:mb-4 tw:m-1 tw:relative tw:flex tw:justify-center"}
		>
			<i className="mdi mdi-lightbulb-group-outline" />
			<div className="tw:absolute bottom tw:w-full tw:m-2 tw:ps-2 tw:pe-2">
				{props.room.name} On
			</div>
		</AppButton>
		<AppButton
			onClick={() => props.handleClick(props.room.id, "OFF")}
			size="lg"
			className={"tw:m-1 tw:relative tw:flex tw:justify-center"}
		>
			<i className="mdi mdi-lightbulb-group-off-outline" />
			<div className="tw:absolute bottom tw:w-full tw:m-2 tw:ps-2 tw:pe-2">
				{props.room.name} Off
			</div>
		</AppButton>
	</div>
);

export default SceneButton;
