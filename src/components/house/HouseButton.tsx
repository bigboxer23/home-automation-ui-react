import React from "react";
import AppButton from "../ui/AppButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "../../utils/navigation";
import { sceneClicked } from "../../actions";
import type { AppDispatch, Device, Room } from "../../types";

interface HouseButtonProps {
	room: Room;
	time: Room | undefined;
	changePage: (event: React.MouseEvent) => void;
	houseOff: (
		event: React.MouseEvent,
		time: Room | undefined,
		devices: Device[],
	) => void;
}

const HouseButton: React.FC<HouseButtonProps> = ({
	room,
	time,
	changePage,
	houseOff,
}) => (
	<AppButton
		onClick={(event: React.MouseEvent) => changePage(event)}
		size="lg"
		className={"m-1 relative flex justify-center"}
	>
		<i className={getButtonStyling(time, room.devices)} />
		<div className="rounded-lg text-white right-2 top-2 min-w-8.75 flex justify-center pe-1 ps-1 absolute bg-bulb">
			{room.totalLights}
		</div>
		<div
			className="absolute bottom-0 w-full m-2 ps-2 pe-2"
			onClick={(event: React.MouseEvent) => houseOff(event, time, room.devices)}
		>
			<div className="text-[0.8rem] leading-[1.3] opacity-70">
				{getTransitionTime(time, room.devices)}
			</div>
			{getScene(time, room.devices)}
		</div>
	</AppButton>
);

const mapDispatchToProps = (dispatch: AppDispatch) =>
	bindActionCreators(
		{
			changePage: (event: React.MouseEvent) => {
				event.stopPropagation();
				return push("/Scenes");
			},
			houseOff: (
				event: React.MouseEvent,
				time: Room | undefined,
				scenes: Device[],
			) => {
				event.stopPropagation();
				let aScene = getScene(time, scenes);
				return sceneClicked(
					aScene.replace(" Off", "").replace(" On", ""),
					aScene.indexOf(" Off") > -1 ? "OFF" : "ON",
				);
			},
		},
		dispatch,
	);

const getButtonStyling = (time: Room | undefined, scenes: Device[]): string => {
	const buttonText = getScene(time, scenes);
	const iconMap: Record<string, string> = {
		"Vacation Mode": "calendar",
		"PTO Mode": "calendar",
		"Evening Off": "weather-night",
		"House Off": "weather-night",
		"Evening On": "lightbulb-group-outline",
	};
	return "mdi tile-icon text-black/30 mdi-" + (iconMap[buttonText] || "clock");
};

const getTransitionTime = (
	time: Room | undefined,
	scenes: Device[],
): string => {
	const scene = getScene(time, scenes);
	const transitionScene =
		scene === "Evening On" ? "vSunset_Time" : "vSunrise_Time";
	const device = time?.devices?.find((d) => d.id === transitionScene);
	const transitionTime = device?.level;
	if (!transitionTime || isNaN(new Date(transitionTime).getTime())) {
		return ""; // Or return some default like "--"
	}
	return new Date(transitionTime)
		.toLocaleTimeString([], {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		})
		.toLowerCase();
};

const getScene = (time: Room | undefined, scenes: Device[]): string => {
	if (isModeActive(scenes, "Vacation Mode")) return "Vacation Mode";
	if (isModeActive(scenes, "Is PTO")) return "PTO Mode";
	if (time?.devices) {
		const deviceStatus = Object.fromEntries(
			time.devices.map((d) => [d.id, d.status]),
		);
		if (deviceStatus["IsMorning"] === "1") return "House Off";
		if (deviceStatus["IsDay"] === "1") return "Evening On";
		if (deviceStatus["IsEvening"] === "1" || deviceStatus["IsNight"] === "1")
			return "Evening Off";
	}
	return "House Off";
};

const isModeActive = (scenes: Device[], modeName: string): boolean => {
	return scenes?.find((scene) => modeName === scene.name)?.level === "1";
};

export default connect(null, mapDispatchToProps)(HouseButton);
