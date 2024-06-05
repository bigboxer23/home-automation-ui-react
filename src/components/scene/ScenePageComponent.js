import React from "react";
import HeaderComponent from "../HeaderComponent";
import SceneButton from "./SceneButton";
import { Button } from "react-bootstrap";
import MeuralHeaderComponent from "../meural/MeuralHeaderComponent";
import SceneHeaderComponent from "./SceneHeaderComponent";

const ScenePageComponent = ({ back, rooms, handleClick, gotoPage }) => (
	<div>
		<div className="background"></div>
		<SceneHeaderComponent back={back} name={"Scenes"} />
		<div className="p-2 w-100 h-100 d-flex flex-wrap justify-content-center align-content-start room-content">
			{rooms.map((room) => (
				<SceneButton key={room.name} room={room} handleClick={handleClick} />
			))}
			<div>
				<Button
					onClick={() => gotoPage("Security")}
					variant=""
					size="lg"
					className={"mb-3 m-1 position-relative d-flex justify-content-center"}
				>
					<i className="mdi mdi-video-wireless-outline" />
					<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">
						Front Door Security
					</div>
				</Button>
				<Button
					onClick={() => gotoPage("Grow")}
					variant=""
					size="lg"
					className={"mb-3 m-1 position-relative d-flex justify-content-center"}
				>
					<i className="mdi mdi-video-wireless-outline" />
					<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">
						Grow Tent
					</div>
				</Button>
			</div>
		</div>
	</div>
);

export default ScenePageComponent;
