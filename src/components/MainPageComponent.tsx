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
		<div className="tw:p-2 tw:w-full tw:h-full tw:flex tw:flex-wrap tw:justify-center tw:content-start">
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
