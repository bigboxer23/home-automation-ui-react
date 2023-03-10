import React from "react";
import { Button } from "react-bootstrap";
import { getFormattedTemp, getTempStyle } from "../../utils/WeatherUtilities";
import { isOn } from "../room/RoomButton";

class GarageButton extends React.Component {
	constructor(props) {
		super(props);
		GarageButton.findGarageDevice = GarageButton.findGarageDevice.bind(this);
	}

	render = () => (
		<Button
			onClick={() =>
				this.props.handleGarageClick(
					GarageButton.isDoorOpen(this.props.room) ? "Close" : "Open"
				)
			}
			variant={this.getButtonStyle()}
			size="lg"
			className={"m-1 position-relative d-flex justify-content-center"}
		>
			<i className="mdi mdi-garage" />
			<div
				className="temp-display pe-1 ps-1 position-absolute"
				style={getTempStyle(
					GarageButton.findGarageTemperature(this.props.room)
				)}
				onClick={(event) => this.props.handleGarageMoreClick(event)}
			>
				{getFormattedTemp(GarageButton.findGarageTemperature(this.props.room))}
			</div>
			<div className="position-absolute bottom w-100 m-2 ps-2 pe-2">
				<div className="autoClose minor-text">
					{GarageButton.getAutoClose(this.props.room)}
				</div>
				{this.props.room.name}
			</div>
		</Button>
	);

	getButtonStyle() {
		return GarageButton.isDoorOpen(this.props.room)
			? "danger"
			: isOn(this.props.room)
			? "success"
			: "default";
	}

	static findGarageDevice(room) {
		return room == null
			? null
			: room.devices.find((theDevice) => "Garage Opener" === theDevice.name);
	}

	static findGarageTemperature(room) {
		let device = GarageButton.findGarageDevice(room);
		return device == null ? 100 : device.temperature;
	}

	static isDoorOpen(room) {
		return "true" === GarageButton.findGarageDevice(room)?.status;
	}

	static getAutoClose(room) {
		if (GarageButton.findGarageDevice(room) == null) {
			return "";
		}
		let anAutoClose = GarageButton.findGarageDevice(room)?.autoClose;
		if (anAutoClose === 0) {
			return "";
		}
		anAutoClose = anAutoClose / 1000;
		let hours = ~~(anAutoClose / 3600);
		let minutes = ~~((anAutoClose % 3600) / 60);
		let seconds = ~~anAutoClose % 60;
		let aAutoCloseString = "";
		if (hours > 0) {
			aAutoCloseString += "" + hours + ":" + (minutes < 10 ? "0" : "");
		}

		aAutoCloseString += "" + minutes + ":" + (seconds < 10 ? "0" : "");
		return aAutoCloseString + "" + seconds;
	}
}
export default GarageButton;
