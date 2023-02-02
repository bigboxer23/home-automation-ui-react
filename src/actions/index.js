import {getClimateData, getSetpointDevice} from "../containers/ClimatePage";

const statusUpdated = data => ({
	type: 'STATUS_UPDATED',
	data
});

const updateStoreRoom = room => ({
	type: 'ROOM_CLICKED',
	room
});

const updateGarageState = state => ({
	type: 'GARAGE_STATE_CHANGE',
	state
});

const setAuthError = authError => ({
	type: 'AUTH_ERROR',
	authError
});

const requestStatus = () => ({
		type: "REQUEST_STATUS"
});

const setTimerId = timer => ({
	type: "SET_TIMER_ID",
	timer
});

const updateThermostatSetPoint = setpoint => ({
	type: "UPDATE_THERMOSTAT_SET_POINT",
	setpoint
});

const updateOnOff = (id, on) => ({
	type: "UPDATE_ON_OFF",
	id,
	on
});

const updateDim = (id, level) => ({
	type: "UPDATE_DIM",
	id,
	level
});

const fetchWithCookies = function(theUrl) {
	return fetch(theUrl, {
		credentials: 'same-origin'
	});
};

const handleErrors = function(response, dispatch) {
	if (!response.ok && response.status === 401) {
		console.log("Auth error, attempting registration.");
		dispatch(setAuthError(true));
		fetchWithCookies("/getToken")
				.then((response) =>
		{
			dispatch(setAuthError(!response.ok))
		});
	}
	return response;
};

const fetchStatus = function() {
	return (dispatch, getState) => {
		dispatch(cancelFetchTimer());
		dispatch(requestStatus());
		return fetchWithCookies("/SceneStatus")
				.then(response => handleErrors(response, dispatch)).then(theResults =>
		{
			return theResults.json();
		}).then(theData =>
		{
			if (theData != null && theData.rooms != null)
			{
				dispatch(statusUpdated(theData.rooms));
			}
		}).finally(() => dispatch(setTimerId(setTimeout(() => dispatch(fetchStatus()), 3000))));
	}
};

export function fetchStatusIfNecessary() {
	return (dispatch, getState) => {
		if (!getState().house.isFetching && getState().house.timer == null)
		{
			dispatch(fetchStatus());
		}
	}
}

export function setDimLocal(level, id)
{
	return (dispatch, getState) =>
	{
		dispatch(cancelFetchTimer());
		dispatch(updateDim(id, level));
	}
}

export function setDim(setPoint, id)
{
	return (dispatch, getState) =>
	{
		fetchWithCookies("/S/OpenHAB/" + id + "/" + setPoint)
				.finally(() => dispatch(setTimerId(setTimeout(() => dispatch(fetchStatus()), 3000))));
	}
}

export function setOnOff(on, id)
{
	return (dispatch, getState) =>
	{
		dispatch(cancelFetchTimer());
		dispatch(updateOnOff(id, on));
		fetchWithCookies("/S/OpenHAB/" + id + "/" + (on ? "ON" : "OFF"))
				.finally(() => dispatch(setTimerId(setTimeout(() => dispatch(fetchStatus()), 3000))));
	}
}
export function cancelFetchTimer()
{
	return (dispatch, getState) =>
	{
		if (getState().house.timer != null)
		{
			clearTimeout(getState().house.timer);
			dispatch(setTimerId(null));
		}
	}
}

export function garageClicked(action)
{
	return (dispatch, getState) => {
		dispatch(cancelFetchTimer());
		dispatch(requestStatus());
		dispatch(updateGarageState(action));
		fetchWithCookies("/S/Garage/" + action).finally(() => {
			dispatch(setTimerId(setTimeout(() => dispatch(fetchStatus()), 3000)));
		});
	}
}

export function roomClicked(id, state)
{
	return (dispatch, getState) => {
		let aRoom = getState().house.rooms.find(theRoom => theRoom.id === id);
		if (aRoom != null)
		{
			dispatch(cancelFetchTimer());
			dispatch(requestStatus());
			dispatch(updateStoreRoom(id));
			fetchWithCookies("/S/OpenHAB/" + id + "/" + state).finally(() => {
				dispatch(setTimerId(setTimeout(() => dispatch(fetchStatus()), 3000)));
			});
		}
	};
}

export function sceneClicked(id, verb)
{
	return (dispatch, getState) =>
	{
		dispatch(requestStatus());
		fetchWithCookies("/S/OpenHAB/" + id + "/" + verb)
				.finally(() => {
			dispatch(statusUpdated(getState().house.rooms));
		});
	};
}

export function fanModeChange(action)
{
	return (dispatch, getState) =>
	{
		dispatch(requestStatus());
		fetchWithCookies("/S/OpenHAB/ThermostatFanMode/" + action).finally(() => {
			dispatch(statusUpdated(getState().house.rooms));
		});
	}
}

export function hvacModeChange(action)
{
	return (dispatch, getState) =>
	{
		dispatch(requestStatus());
		fetchWithCookies("/S/OpenHAB/ThermostatMode/" + action).finally(() => {
			dispatch(statusUpdated(getState().house.rooms));
		});
	}
}

export function setThermostatSetPoint(setPoint)
{
	return (dispatch, getState) =>
	{
		fetchWithCookies("/S/OpenHAB/" + getSetpointDevice(getClimateData(getState().house.rooms)).id + "/" + setPoint + " °F")
				.finally(() => dispatch(setTimerId(setTimeout(() => dispatch(fetchStatus()), 3000))));
	}
}

export function setLocalThermostatSetPoint(setPoint)
{
	return (dispatch, getState) =>
	{
		dispatch(cancelFetchTimer());
		dispatch(updateThermostatSetPoint(setPoint));
	}
}

export function disableAutoClose(delay)
{
	return (dispatch, getState) =>
	{
		dispatch(cancelFetchTimer());
		dispatch(requestStatus());
		fetchWithCookies("/S/Garage/SetAutoCloseDelay/" + delay).finally(() => {
			dispatch(setTimerId(setTimeout(() => dispatch(fetchStatus()), 3000)));
		});
	}
}

export function setMeuralOn(setOn)
{
	return (dispatch, getState) =>
	{
		fetchWithCookies(new Request("/S/meural/" + (setOn ? "wakeup" : "sleep"), {method: 'POST', body: '{}'}))
				.finally(dispatch(statusUpdated(getState().house.rooms)));
	};
}

export function nextMeuralImage()
{
	fetchWithCookies(new Request("/S/meural/nextPicture", {method: 'POST', body: '{}'}));
}

export function previousMeuralImage()
{
	fetchWithCookies(new Request("/S/meural/prevPicture", {method: 'POST', body: '{}'}));
}

export function setMeuralSource(sourceInt)
{
	return (dispatch, getState) => {
		fetchWithCookies(new Request("/S/meural/changeSource?source=" + sourceInt, {method: 'POST', body: '{}'}))
				.finally(dispatch(statusUpdated(getState().house.rooms)));
	}
}