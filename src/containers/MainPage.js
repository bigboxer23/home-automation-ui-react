import { connect } from 'react-redux'
import { roomClicked } from '../actions'
import MainPageComponent from "../components/MainPageComponent";
import RoomButton from "../components/RoomButton";

const getRooms = (rooms) => {
	if (rooms == null)
	{
		return [];
	}
	let allItems = rooms.filter(theRoom => shouldDisplay(theRoom));
	return allItems.filter(theRoom => "Climate Control" === theRoom.name)
			.concat(allItems.filter(theRoom => "Garage" === theRoom.name))
			.concat(allItems.filter(theRoom => "Scenes" === theRoom.name))
			.concat(allItems.filter(theRoom => "Garage" !== theRoom.name && "Climate Control" !== theRoom.name && "Scenes" !== theRoom.name));
};

const shouldDisplay = function(theRoom)
{
	return (hasLights(theRoom) || theRoom.name === "Climate Control" || theRoom.name === "Scenes"/*(theRoom.scenes != null && theRoom.scenes.length > 0)*/);
};

const hasLights = function(theRoom)
{
	return theRoom.devices != null && theRoom.devices.filter(theDevice => RoomButton.isLight(theDevice)).length > 0;
};

const mapStateToProps = state => ({
	rooms: getRooms (state.rooms)
});

const mapDispatchToProps = dispatch => ({
	handleClick: (id, state) =>
	{
		dispatch(roomClicked(id, state))
	}
});

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(MainPageComponent)