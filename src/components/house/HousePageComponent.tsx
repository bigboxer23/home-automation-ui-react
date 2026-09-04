import React from "react";
import type { Room } from "../../types";
import HeaderComponent from "../HeaderComponent";
import SceneButton from "../scene/SceneButton";

interface HousePageComponentProps {
	back: () => void;
	rooms: Room[];
	handleClick: (id: string, verb: string) => void;
}

const HousePageComponent: React.FC<HousePageComponentProps> = ({
	back,
	rooms,
	handleClick,
}) => (
	<div>
		<div className="background"></div>
		<HeaderComponent back={back} name={"Scenes"} />
		<div className="tw:p-2 tw:w-full tw:h-full tw:flex tw:flex-wrap tw:justify-center tw:content-start">
			{rooms.map((room) => (
				<SceneButton key={room.name} room={room} handleClick={handleClick} />
			))}
		</div>
	</div>
);

export default HousePageComponent;
