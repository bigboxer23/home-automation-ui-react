import React from "react";
import type { Room } from "../types";
import { mapRoom } from "../containers/MainPage";

interface MainPageComponentProps {
	time: Room | undefined;
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
		<div className="p-2 w-full h-full flex flex-wrap justify-center content-start">
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
