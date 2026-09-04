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
		<div className="p-2 w-full h-full flex flex-wrap justify-center content-start">
			{rooms.map((room) => (
				<SceneButton key={room.name} room={room} handleClick={handleClick} />
			))}
		</div>
	</div>
);

export default HousePageComponent;
