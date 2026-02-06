import roomReducer from "./RoomReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	house: roomReducer,
});

export default rootReducer;
