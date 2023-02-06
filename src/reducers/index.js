import roomReducer from "./RoomReducer";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history) =>
	combineReducers({
		house: roomReducer,
		router: connectRouter(history),
	});
export default createRootReducer;
