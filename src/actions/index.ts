import { getClimateData, getSetpointDevice } from "../containers/ClimatePage";
import type { AppThunk, Room, HouseAction } from "../types";
import type { Dispatch } from "redux";

const statusUpdated = (data: Room[]): HouseAction => ({
	type: "STATUS_UPDATED",
	data,
});

const updateStoreRoom = (room: string): HouseAction => ({
	type: "ROOM_CLICKED",
	room,
});

const updateGarageState = (state: string): HouseAction => ({
	type: "GARAGE_STATE_CHANGE",
	state,
});

const setAuthError = (authError: boolean): HouseAction => ({
	type: "AUTH_ERROR",
	authError,
});

const requestStatus = (): HouseAction => ({
	type: "REQUEST_STATUS",
});

const setTimerId = (
	timer: ReturnType<typeof setTimeout> | null,
): HouseAction => ({
	type: "SET_TIMER_ID",
	timer,
});

const updateThermostatSetPoint = (setPoint: number): HouseAction => ({
	type: "UPDATE_THERMOSTAT_SET_POINT",
	setPoint,
});

const updateOnOff = (id: string, on: boolean): HouseAction => ({
	type: "UPDATE_ON_OFF",
	id,
	on,
});

const updateDim = (id: string, level: string): HouseAction => ({
	type: "UPDATE_DIM",
	id,
	level,
});

const fetchWithCookies = function (
	theUrl: string | Request,
): Promise<Response> {
	return fetch(theUrl, {
		credentials: "same-origin",
	});
};

const handleErrors = function (
	response: Response,
	dispatch: Dispatch<HouseAction>,
): Response {
	if (!response.ok && response.status === 401) {
		console.log("Auth error, attempting registration.");
		dispatch(setAuthError(true));
		fetchWithCookies("/getToken").then((response) => {
			dispatch(setAuthError(!response.ok));
		});
	}
	return response;
};

const USER_ACTION_SUPPRESS_MS = 5000;
const POLL_INTERVAL_MS = 3000;

/**
 * Queue the next status poll, replacing whatever poll is already queued.
 * Scheduling without cancelling first strands the previous timeout: its id is no
 * longer the one held in the store, so cancelFetchTimer can never clear it and
 * two chains end up polling over the top of each other.
 */
const schedulePoll = (): AppThunk => {
	return (dispatch) => {
		dispatch(cancelFetchTimer());
		dispatch(
			setTimerId(setTimeout(() => dispatch(fetchStatus()), POLL_INTERVAL_MS)),
		);
	};
};

const fetchStatus = function (): AppThunk {
	return (dispatch, getState) => {
		dispatch(cancelFetchTimer());
		dispatch(requestStatus());
		const lastUpdateAtStart = getState().house.lastUpdate;
		return fetchWithCookies("/SceneStatus")
			.then((response) => handleErrors(response, dispatch))
			.then((theResults) => {
				return theResults.json();
			})
			.then((theData) => {
				if (theData != null && theData.rooms != null) {
					const house = getState().house;
					const withinSuppressWindow =
						house.lastUserActionAt != null &&
						Date.now() - house.lastUserActionAt < USER_ACTION_SUPPRESS_MS;
					if (house.lastUpdate === lastUpdateAtStart && !withinSuppressWindow) {
						dispatch(statusUpdated(theData.rooms));
					}
				}
			})
			.catch((error) => {
				console.warn("Status poll failed", error);
			})
			.finally(() => dispatch(schedulePoll()));
	};
};

export function fetchStatusIfNecessary(): AppThunk {
	return (dispatch, getState) => {
		if (!getState().house.isFetching && getState().house.timer == null) {
			dispatch(fetchStatus());
		}
	};
}

export function setDimLocal(level: string, id: string): AppThunk {
	return (dispatch) => {
		dispatch(cancelFetchTimer());
		dispatch(updateDim(id, level));
	};
}

export function setDim(setPoint: string, id: string): AppThunk {
	return (dispatch) => {
		fetchWithCookies("/S/OpenHAB/" + id + "/" + setPoint).finally(() =>
			dispatch(schedulePoll()),
		);
	};
}

export function setOnOff(on: boolean, id: string): AppThunk {
	return (dispatch) => {
		dispatch(cancelFetchTimer());
		dispatch(updateOnOff(id, on));
		fetchWithCookies("/S/OpenHAB/" + id + "/" + (on ? "ON" : "OFF")).finally(
			() => dispatch(schedulePoll()),
		);
	};
}
export function cancelFetchTimer(): AppThunk {
	return (dispatch, getState) => {
		if (getState().house.timer != null) {
			clearTimeout(getState().house.timer!);
			dispatch(setTimerId(null));
		}
	};
}

export function garageClicked(action: string): AppThunk {
	return (dispatch) => {
		dispatch(cancelFetchTimer());
		dispatch(requestStatus());
		dispatch(updateGarageState(action));
		fetchWithCookies("/S/Garage/" + action).finally(() => {
			dispatch(schedulePoll());
		});
	};
}

export function roomClicked(id: string, state: number | string): AppThunk {
	return (dispatch, getState) => {
		let aRoom = getState().house.rooms.find((theRoom) => theRoom.id === id);
		if (aRoom != null) {
			dispatch(cancelFetchTimer());
			dispatch(requestStatus());
			dispatch(updateStoreRoom(id));
			fetchWithCookies("/S/OpenHAB/" + id + "/" + state).finally(() => {
				dispatch(schedulePoll());
			});
		}
	};
}

export function sceneClicked(id: string, verb: string): AppThunk {
	return (dispatch, getState) => {
		dispatch(requestStatus());
		fetchWithCookies("/S/OpenHAB/" + id + "/" + verb).finally(() => {
			dispatch(statusUpdated(getState().house.rooms));
		});
	};
}

export function fanModeChange(action: string): AppThunk {
	return (dispatch, getState) => {
		dispatch(requestStatus());
		fetchWithCookies("/S/OpenHAB/ThermostatFanMode/" + action).finally(() => {
			dispatch(statusUpdated(getState().house.rooms));
		});
	};
}

export function hvacModeChange(action: string): AppThunk {
	return (dispatch, getState) => {
		dispatch(requestStatus());
		fetchWithCookies("/S/OpenHAB/ThermostatMode/" + action).finally(() => {
			dispatch(statusUpdated(getState().house.rooms));
		});
	};
}

export function setThermostatSetPoint(setPoint: number): AppThunk {
	return (dispatch, getState) => {
		fetchWithCookies(
			"/S/OpenHAB/" +
				getSetpointDevice(getClimateData(getState().house.rooms))!.id +
				"/" +
				setPoint +
				" °F",
		).finally(() => dispatch(schedulePoll()));
	};
}

export function setLocalThermostatSetPoint(setPoint: number): AppThunk {
	return (dispatch) => {
		dispatch(cancelFetchTimer());
		dispatch(updateThermostatSetPoint(setPoint));
	};
}

export function disableAutoClose(delay: number): AppThunk {
	return (dispatch) => {
		dispatch(cancelFetchTimer());
		dispatch(requestStatus());
		fetchWithCookies("/S/Garage/SetAutoCloseDelay/" + delay).finally(() => {
			dispatch(schedulePoll());
		});
	};
}

export function setMeuralOn(setOn: boolean): AppThunk {
	return (dispatch, getState) => {
		fetchWithCookies(
			getPostRequest("/S/meural/" + (setOn ? "wakeup" : "sleep")),
		).finally(() => dispatch(statusUpdated(getState().house.rooms)));
	};
}

export function nextMeuralImage(): void {
	fetchWithCookies(getPostRequest("/S/meural/nextPicture"));
}

export function previousMeuralImage(): void {
	fetchWithCookies(getPostRequest("/S/meural/prevPicture"));
}

export function setMeuralSource(sourceInt: string | number): AppThunk {
	return (dispatch, getState) => {
		fetchWithCookies(
			getPostRequest("/S/meural/changeSource?source=" + sourceInt),
		).finally(() => dispatch(statusUpdated(getState().house.rooms)));
	};
}

export function updateOpenAIQuality(quality: string): void {
	fetchWithCookies(
		getPostRequest(
			"/S/meural/updateOpenAIQuality?quality=" + encodeURIComponent(quality),
		),
	);
}

export function updateOpenAIStyle(style: string): void {
	fetchWithCookies(
		getPostRequest(
			"/S/meural/updateOpenAIStyle?style=" + encodeURIComponent(style),
		),
	);
}

export function updateOpenAIPrompt(prompt: string): void {
	fetchWithCookies(
		getPostRequest(
			"/S/meural/updateOpenAIPrompt?prompt=" + encodeURIComponent(prompt),
		),
	);
}

export function showInfo(): void {
	fetchWithCookies(getPostRequest("/S/meural/showInfo"));
}

export function hideInfo(): void {
	fetchWithCookies(getPostRequest("/S/meural/hideInfo"));
}

function getPostRequest(url: string): Request {
	return new Request(url, getBody());
}

function getBody(): RequestInit {
	return {
		method: "POST",
		body: "{}",
		headers: {
			"X-XSRF-TOKEN": document.cookie.replace(
				/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/,
				"$1",
			),
		},
	};
}
