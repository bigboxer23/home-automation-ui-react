import React from "react";
import AppButton, { type ButtonState } from "../ui/AppButton";
import type { Device, Room } from "../../types";
import { getFormattedTemp, getTempStyle } from "../../utils/WeatherUtilities";
import { isOn } from "../room/RoomUtils";

interface GarageButtonProps {
	room: Room;
	handleGarageClick: (action: string) => void;
	handleGarageMoreClick: (event: React.MouseEvent) => void;
}

class GarageButton extends React.Component<GarageButtonProps> {
	constructor(props: GarageButtonProps) {
		super(props);
		GarageButton.findGarageDevice = GarageButton.findGarageDevice.bind(this);
	}

	render = () => (
		<AppButton
			onClick={() =>
				this.props.handleGarageClick(
					GarageButton.isDoorOpen(this.props.room) ? "Close" : "Open",
				)
			}
			state={this.getButtonStyle()}
			size="lg"
			className={"m-1 relative flex justify-center"}
		>
			{/* The two state variants outrank the muted base on specificity, so
			    they win regardless of the order Tailwind emits them in. */}
			<i className="mdi tile-icon mdi-garage text-black/30 [[data-state=on]_&]:text-bulb [[data-state=alert]_&]:text-white" />
			<div
				/* The `on` background is the last of `[data-state=on] .temp-display`.
				   It only shows through when getTempStyle has no temperature to
				   report and so returns opacity rather than a background colour. */
				className="rounded-lg text-white right-2 top-2 min-w-8.75 flex justify-center pe-1 ps-1 absolute [[data-state=on]_&]:bg-black/30"
				style={getTempStyle(
					GarageButton.findGarageTemperature(this.props.room),
				)}
				onClick={(event: React.MouseEvent) =>
					this.props.handleGarageMoreClick(event)
				}
			>
				{getFormattedTemp(GarageButton.findGarageTemperature(this.props.room))}
			</div>
			{/* Turns white on an open (alert) door, which used to be reached via
			    `[data-state="alert"] .bottom` in index.css. */}
			<div className="absolute bottom-0 w-full m-2 ps-2 pe-2 [[data-state=alert]_&]:text-white">
				<div className="text-white text-[0.8rem] leading-[1.3] opacity-70">
					{GarageButton.getAutoClose(this.props.room)}
				</div>
				<div className={this.getLastOpenStyle()}>
					{GarageButton.getLastOpen(this.props.room)}
				</div>
				{this.props.room.name}
			</div>
		</AppButton>
	);

	getLastOpenStyle(): string {
		return (
			"text-[0.8rem] leading-[1.3] opacity-70" +
			(GarageButton.isDoorOpen(this.props.room) ? " hidden" : "")
		);
	}
	getButtonStyle(): ButtonState {
		return GarageButton.isDoorOpen(this.props.room)
			? "alert"
			: isOn(this.props.room)
				? "on"
				: "off";
	}

	static findGarageDevice(room: Room | null): Device | null | undefined {
		return room == null
			? null
			: room.devices.find((theDevice) => "Garage Opener" === theDevice.name);
	}

	static findGarageTemperature(room: Room): number | undefined {
		let device = GarageButton.findGarageDevice(room);
		return device == null ? 100 : device.temperature;
	}

	static isDoorOpen(room: Room): boolean {
		return "true" === GarageButton.findGarageDevice(room)?.status;
	}

	static getLastOpen(room: Room): string {
		let lastOpened = GarageButton.findGarageDevice(room)?.historicOpenTime;
		if (lastOpened === undefined || lastOpened === 0) {
			return "";
		}
		let date = new Date(lastOpened);
		let minutes: string | number = date.getMinutes(),
			hours = date.getHours();
		minutes = minutes < 10 ? "0" + minutes : minutes;
		let extra = "";
		if (new Date().getDate() !== date.getDate()) {
			extra = " " + (date.getMonth() + 1) + "/" + date.getDate();
		}
		return (
			(hours > 12 ? hours % 12 : hours === 0 ? 12 : hours) +
			":" +
			minutes +
			(hours >= 12 ? " pm" : " am") +
			extra
		);
	}

	static getAutoClose(room: Room): string {
		let autoClose = GarageButton.findGarageDevice(room)?.autoClose;
		if (autoClose === undefined || autoClose === 0) {
			return "";
		}
		autoClose = autoClose / 1000;
		let hours = ~~(autoClose / 3600);
		let minutes = ~~((autoClose % 3600) / 60);
		let seconds = ~~autoClose % 60;
		let aAutoCloseString = "";
		if (hours > 0) {
			aAutoCloseString += "" + hours + ":" + (minutes < 10 ? "0" : "");
		}

		aAutoCloseString += "" + minutes + ":" + (seconds < 10 ? "0" : "");
		return aAutoCloseString + "" + seconds;
	}
}
export default GarageButton;
