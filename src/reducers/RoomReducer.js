import RoomButton from "../components/room/RoomButton";

const roomReducer = (state = {}, action) => {
	switch (action.type) {
		case "STATUS_UPDATED":
			return {
				...state,
				isFetching: false,
				rooms: action.data,
				lastUpdate: Date.now(),
			};
		case "ROOM_CLICKED":
			const id = action.room;
			return {
				...state,
				isFetching: true,
				rooms: state.rooms.map((room) => {
					if (room.id !== id) {
						return room;
					}
					let isOn = RoomButton.isOn(room) ? "0" : "1";
					return {
						...room,
						devices: room.devices.map((theDevice) => {
							if (theDevice.name.includes("Override")) {
								return theDevice;
							}
							return { ...theDevice, status: isOn };
						}),
					};
				}),
				lastUpdate: Date.now(),
			};
		case "GARAGE_STATE_CHANGE":
			return {
				...state,
				isFetching: true,
				rooms: state.rooms.map((room) => {
					if (room.name !== "Garage") {
						return room;
					}
					return {
						...room,
						devices: room.devices.map((theDevice) => {
							if (theDevice.name !== "Garage Opener") {
								return theDevice;
							}
							return { ...theDevice, door: action.state === "Open" };
						}),
					};
				}),
				lastUpdate: Date.now(),
			};
		case "REQUEST_STATUS":
			return { ...state, isFetching: true };
		case "SET_TIMER_ID":
			return { ...state, timer: action.timer };
		case "UPDATE_THERMOSTAT_SET_POINT":
			return {
				...state,
				rooms: state.rooms.map((room) => {
					if (room.name !== "Climate") {
						return room;
					}
					return {
						...room,
						devices: room.devices.map((theDevice) => {
							if (
								theDevice.name === "Heating Setpoint" ||
								theDevice.name === "Cooling Setpoint"
							) {
								return { ...theDevice, level: action.setpoint + "" };
							}
							return theDevice;
						}),
					};
				}),
				lastUpdate: Date.now(),
			};
		case "UPDATE_ON_OFF":
			return {
				...state,
				rooms: state.rooms.map((room) => {
					if (
						room.devices.find((theDevice) => theDevice.id === action.id) == null
					) {
						return room;
					}
					return {
						...room,
						devices: room.devices.map((theDevice) => {
							if (theDevice.id !== action.id) {
								return theDevice;
							}
							return { ...theDevice, level: action.on === true ? "100" : "0" };
						}),
					};
				}),
				lastUpdate: Date.now(),
			};
		case "UPDATE_DIM":
			return {
				...state,
				rooms: state.rooms.map((room) => {
					if (room.id === action.id) {
						//whole room dimming
						return {
							...room,
							devices: room.devices.map((theDevice) => {
								if (theDevice.category !== "2") {
									return theDevice;
								}
								return { ...theDevice, level: action.level };
							}),
						};
					}
					if (
						room.devices.find((theDevice) => theDevice.id === action.id) == null
					) {
						return room;
					}
					return {
						...room,
						devices: room.devices.map((theDevice) => {
							if (theDevice.id !== action.id) {
								return theDevice;
							}
							return { ...theDevice, level: action.level };
						}),
					};
				}),
				lastUpdate: Date.now(),
			};
		case "AUTH_ERROR":
			return { ...state, authError: action.authError };
		default:
			return state;
	}
};

export default roomReducer;
