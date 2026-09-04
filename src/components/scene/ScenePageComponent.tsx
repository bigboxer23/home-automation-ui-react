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
		<div className="tw:p-2 tw:w-full tw:h-full tw:flex tw:flex-wrap tw:justify-center tw:content-start room-content">
			{rooms.map((room) => (
				<SceneButton key={room.name} room={room} handleClick={handleClick} />
			))}
			<div>
				<AppButton
					onClick={() => gotoPage("Security")}
					size="lg"
					className={"tw:mb-4 tw:m-1 tw:relative tw:flex tw:justify-center"}
				>
					<i className="mdi mdi-video-wireless-outline" />
					<div className="tw:absolute bottom tw:w-full tw:m-2 tw:ps-2 tw:pe-2">
						Front Door Security
					</div>
				</AppButton>
				<AppButton
					onClick={() => gotoPage("Grow")}
					size="lg"
					className={"tw:mb-4 tw:m-1 tw:relative tw:flex tw:justify-center"}
				>
					<i className="mdi mdi-video-wireless-outline" />
					<div className="tw:absolute bottom tw:w-full tw:m-2 tw:ps-2 tw:pe-2">
						Grow Tent
					</div>
				</AppButton>
			</div>
		</div>
	</div>
);

export default ScenePageComponent;
