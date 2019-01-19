import RoomButton from "../components/room/RoomButton"

const roomReducer = (state = {}, action) => {
	switch (action.type) {
		case 'STATUS_UPDATED':
			return Object.assign({}, state, {isFetching: false, rooms:action.data, lastUpdate:Date.now()});
		case 'ROOM_CLICKED':
			const id = action.room;
			return Object.assign({}, state, {isFetching: true, rooms:state.rooms.map(room => {
					if (room.id !== id)
					{
						return room;
					}
					let isOn = RoomButton.isOn(room) ? "0" : "1";
					return Object.assign({}, room, {devices:room.devices
								.map(theDevice =>
								{
									if (theDevice.name.includes("Override"))
									{
										return theDevice;
									}
									return Object.assign({}, theDevice, {status:isOn})
								})});
				}), lastUpdate:Date.now()});
		case 'GARAGE_STATE_CHANGE':
			return Object.assign({}, state, {isFetching: true, rooms:state.rooms.map(room => {
					if (room.name !== 'Garage')
					{
						return room;
					}
					return Object.assign({}, room, {devices:room.devices.map(theDevice =>
						{
							if (theDevice.name !== "Garage Opener")
							{
								return theDevice;
							}
							return Object.assign({}, theDevice, {door:action.state === "Open"});
						})});
				}), lastUpdate:Date.now()});
		case 'REQUEST_STATUS':
			return Object.assign({}, state, {
				isFetching: true
			});
		case 'SET_TIMER_ID':
			return Object.assign({}, state, {
				timer: action.timer
			});
		case 'UPDATE_THERMOSTAT_SET_POINT':
			return Object.assign({}, state, {rooms:state.rooms.map(room => {
					if (room.name !== "Climate")
					{
						return room;
					}
					return Object.assign({}, room, {devices:room.devices.map(theDevice =>
						{
							if (theDevice.name === "Heating Setpoint" || theDevice.name === "Cooling Setpoint")
							{
								return Object.assign({}, theDevice, {level:action.setpoint + ""})
							}
							return theDevice;
						})});
				}), lastUpdate:Date.now()});
		case 'UPDATE_ON_OFF':
			return Object.assign({}, state, {rooms:state.rooms.map(room => {
					if (room.devices.find(theDevice => theDevice.id === action.id) == null)
					{
						return room;
					}
					return Object.assign({}, room, {devices:room.devices.map(theDevice =>
						{
							if (theDevice.id !== action.id)
							{
								return theDevice;
							}
							return Object.assign({}, theDevice, {level:(action.on === true ? "1" : "0")});
						})});
				}), lastUpdate:Date.now()});
		case 'AUTH_ERROR':
			return Object.assign({}, state, {authError: action.authError});
		default:
			return state
	}
};

export default roomReducer;
