import type { ThunkAction, ThunkDispatch } from "redux-thunk";

// ===== Device Types =====
export interface Device {
	id: string;
	name: string;
	status?: string;
	level?: string;
	category?: string;
	temperature?: number;
	humidity?: number;
	door?: boolean;
	historicOpenTime?: number;
	autoClose?: number;
}

// ===== Room Types =====
export interface Room {
	id: string;
	name: string;
	devices: Device[];
	totalLights?: number;
}

// ===== Redux State =====
export interface HouseState {
	rooms: Room[];
	isFetching: boolean;
	timer: ReturnType<typeof setTimeout> | null;
	authError: boolean;
	lastUpdate?: number;
}

export interface RootState {
	house: HouseState;
}

// ===== Action Types =====
export interface StatusUpdatedAction {
	type: "STATUS_UPDATED";
	data: Room[];
}

export interface RoomClickedAction {
	type: "ROOM_CLICKED";
	room: string;
}

export interface GarageStateChangeAction {
	type: "GARAGE_STATE_CHANGE";
	state: string;
}

export interface RequestStatusAction {
	type: "REQUEST_STATUS";
}

export interface SetTimerIdAction {
	type: "SET_TIMER_ID";
	timer: ReturnType<typeof setTimeout> | null;
}

export interface UpdateThermostatSetPointAction {
	type: "UPDATE_THERMOSTAT_SET_POINT";
	setPoint: number;
}

export interface UpdateOnOffAction {
	type: "UPDATE_ON_OFF";
	id: string;
	on: boolean;
}

export interface UpdateDimAction {
	type: "UPDATE_DIM";
	id: string;
	level: string;
}

export interface AuthErrorAction {
	type: "AUTH_ERROR";
	authError: boolean;
}

export type HouseAction =
	| StatusUpdatedAction
	| RoomClickedAction
	| GarageStateChangeAction
	| RequestStatusAction
	| SetTimerIdAction
	| UpdateThermostatSetPointAction
	| UpdateOnOffAction
	| UpdateDimAction
	| AuthErrorAction;

// ===== Thunk Types =====
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	HouseAction
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, HouseAction>;

// ===== Utility Types =====
export type DeviceMap = Record<string, Device>;
