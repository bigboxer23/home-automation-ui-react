import RoomButton from "../components/RoomButton"

const roomReducer = (state = {}, action) => {
	switch (action.type) {
		case 'STATUS_UPDATED':
			return Object.assign({}, state, {isFetching: false, rooms:action.data, lastUpdate:Date.now()});
		case 'ROOM_CLICKED':
			const id = action.room;
			return Object.assign({}, state, {isFetching: true, rooms:state.rooms.map(room => {
					if (room.id === id)
					{
						let isOn = RoomButton.isOn(room) ? "0" : "1";
						room = Object.assign({}, room, {devices:room.devices.map(theDevice => Object.assign({}, theDevice, {status:isOn}))});
					}
					return room;
				}), lastUpdate:Date.now()});
		case 'REQUEST_STATUS':
			return Object.assign({}, state, {
				isFetching: true
			});
		default:
			return state
	}
};

export default roomReducer;
