import roomReducer from './RoomReducer'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'


export default combineReducers({
	house: roomReducer,
	router: routerReducer
})
