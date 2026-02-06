import React from "react";
import type { Room } from "../types";
import { mapRoom } from "../containers/MainPage";

interface MainPageComponentProps {
	time: Room;
	rooms: Room[];
	handleClick: (
		event: React.MouseEvent,
		id: string,
		state: string | number,
	) => void;
	handleGarageClick: (action: string) => void;
	handleMoreClick: (event: React.MouseEvent, name: string) => void;
	handleGarageMoreClick: (event: React.MouseEvent) => void;
}

const MainPageComponent: React.FC<MainPageComponentProps> = ({
	time,
	rooms,
	handleClick,
	handleGarageClick,
	handleMoreClick,
	handleGarageMoreClick,
}) => (
	<div>
		<div className="background"></div>
		<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start">
			{rooms.map((room) =>
				mapRoom(
					time,
					room,
					handleClick,
					handleGarageClick,
					handleMoreClick,
					handleGarageMoreClick,
				),
			)}
		</div>
	</div>
);

export default MainPageComponent;
