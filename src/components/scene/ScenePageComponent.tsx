import React from "react";
import type { Room } from "../../types";
import SceneButton from "./SceneButton";
import AppButton from "../ui/AppButton";
import SceneHeaderComponent from "./SceneHeaderComponent";

interface ScenePageComponentProps {
	back: () => void;
	rooms: Room[];
	handleClick: (id: string, verb: string) => void;
	gotoPage: (page: string) => void;
}

const ScenePageComponent: React.FC<ScenePageComponentProps> = ({
	back,
	rooms,
	handleClick,
	gotoPage,
}) => (
	<div>
		<div className="background"></div>
		<SceneHeaderComponent back={back} name={"Scenes"} />
		<div className="p-2 w-full h-full flex flex-wrap justify-center content-start room-content">
			{rooms.map((room) => (
				<SceneButton key={room.name} room={room} handleClick={handleClick} />
			))}
			<div>
				<AppButton
					onClick={() => gotoPage("Security")}
					size="lg"
					className={"mb-4 m-1 relative flex justify-center"}
				>
					<i className="mdi mdi-video-wireless-outline" />
					<div className="absolute bottom w-full m-2 ps-2 pe-2">
						Front Door Security
					</div>
				</AppButton>
				<AppButton
					onClick={() => gotoPage("Grow")}
					size="lg"
					className={"mb-4 m-1 relative flex justify-center"}
				>
					<i className="mdi mdi-video-wireless-outline" />
					<div className="absolute bottom w-full m-2 ps-2 pe-2">Grow Tent</div>
				</AppButton>
			</div>
		</div>
	</div>
);

export default ScenePageComponent;
