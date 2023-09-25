import React from "react";
import { Button } from "react-bootstrap";
import { getTemp } from "../../utils/WeatherUtilities";
class RoomButton extends React.Component {
	render = () => (
		<Button
			onClick={() =>
				this.props.handleClick(
					this.props.room.id,
					isOn(this.props.room) ? 0 : 100,
				)
			}
			variant={this.getButtonStyle()}
			size="lg"
			className={"m-1 position-relative d-flex justify-content-center"}
		>
			<i
				className={
					"mdi mdi-lightbulb-outline" +
					this.getBatteryWarningStyle(this.props.room) +
					RoomButton.getLockedStatus(this.props.room)
				}
			/>
			<i
				className={
					"mdi mdi-dots-horizontal inFront" +
					RoomButton.areDotsHidden(this.props.room)
				}
				onClick={(event) =>
					this.props.handleMoreClick(event, this.props.room.name)
				}
			/>
			<div className="temp-display pe-1 ps-1 position-absolute total-lights-bg">
				{RoomButton.getCountContent(this.props.room)}
			</div>
			<div className="position-absolute bottom w-100 m-2 ps-2 pe-3">
				{this.props.room.name}
			</div>
		</Button>
	);

	static onCount = (room) => {
		let aCount = 0;
		if (room.devices == null) {
			return aCount;
		}
		room.devices.forEach((device) => {
			if (isDeviceOn(device)) {
				aCount++;
			}
		});
		return aCount;
	};

	static isLight = (device) =>
		device.category === "2" ||
		device.category === "3" /*&& !device.name.includes("Override")*/;

	static isFan = (device) => device.category === "3";

	static areDotsHidden = (room) =>
		RoomButton.getCountContent(room) === "" ? "" : " hide";

	static getRoomTemp = (room) => {
		let temp = getTemp(room.devices);
		return temp < 99 ? temp + "°" : "";
	};

	static getLockedStatus = (room) => {
		if (
			room.devices != null &&
			room.devices.some(
				(device) =>
					device.name != null &&
					device.name.includes("Override") &&
					device.status === "1",
			)
		) {
			return " mdi-lock-outline";
		}
		return "";
	};

	static getCountContent = (room) => {
		let aCount = RoomButton.onCount(room);
		return aCount === 0 ? RoomButton.getRoomTemp(room) : aCount;
	};

	getBatteryWarningStyle = (room) => {
		let aLowBatteries = room.devices.find((device) => {
			return (
				device.name != null &&
				device.name.endsWith("Battery") &&
				parseInt(device.level, 10) < 40 &&
				parseInt(device.level, 10) !== 0
			);
		});
		if (aLowBatteries != null) {
			return " danger";
		}
		return "";
	};

	getButtonStyle() {
		return isOn(this.props.room) ? "success" : "default";
	}

	//expose for reducer
	static isOn = (room) => {
		return isOn(room);
	};
}

export const isOn = function (room) {
	if (room.devices == null) {
		return false;
	}
	let onDevice = room.devices.find((device) => {
		return isDeviceOn(device);
	});
	return onDevice != null;
};

export const isDeviceOn = function (device) {
	return (
		RoomButton.isLight(device) &&
		device.status === "1" &&
		device.level !== "NULL" &&
		!device.name.includes("Override")
	);
};

export default RoomButton;
