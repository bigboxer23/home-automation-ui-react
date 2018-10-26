import {getClimateData, getThermostatId} from "../containers/ClimatePage";

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

export function setThermostatSetPoint(setPoint)
{
	return (dispatch, getState) =>
	{
		fetchWithCookies("/S/OpenHAB/Device/" + getThermostatId(getClimateData(getState().house.rooms)) + "/TemperatureSetpoint1&action=SetCurrentSetpoint&NewCurrentSetpoint=" + setPoint)
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

export function setDim(setPoint, id, subject)
{
	return (dispatch, getState) =>
	{
		fetchWithCookies("/S/OpenHAB/" + subject + "/" + id + "/" + setPoint)
				.finally(() => dispatch(setTimerId(setTimeout(() => dispatch(fetchStatus()), 3000))));
	}
}

export function setOnOff(on, id, subject)
{
	return (dispatch, getState) =>
	{
		dispatch(cancelFetchTimer());
		fetchWithCookies("/S/OpenHAB/" + subject + "/" + id + "/" + (on ? "ON" : "OFF"))
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
			fetchWithCookies("/S/OpenHAB/Room/" + id + "/" + state).finally(() => {
				dispatch(setTimerId(setTimeout(() => dispatch(fetchStatus()), 3000)));
			});
		}
	};
}

export function sceneClicked(id)
{
	return (dispatch, getState) =>
	{
		dispatch(requestStatus());
		fetchWithCookies("/S/OpenHAB/Device/" + id + "/ON")
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
		fetchWithCookies("/S/OpenHAB/Device/" + getThermostatId(getClimateData(getState().house.rooms)) + "/HVAC_FanOperatingMode1&action=SetMode&NewMode=" + action).finally(() => {
			dispatch(statusUpdated(getState().house.rooms));
		});
	}
}

export function hvacModeChange(action)
{
	return (dispatch, getState) =>
	{
		dispatch(requestStatus());
		fetchWithCookies("/S/OpenHAB/Device/" + getThermostatId(getClimateData(getState().house.rooms)) + "/HVAC_UserOperatingMode1&action=SetModeTarget&NewModeTarget=" + action).finally(() => {
			dispatch(statusUpdated(getState().house.rooms));
		});
	}
}

export function disableAutoClose()
{
	console.log("disable auto close");
	return (dispatch, getState) =>
	{
		dispatch(cancelFetchTimer());
		dispatch(requestStatus());
		fetchWithCookies("/S/Garage/DisableAutoClose").finally(() => {
			dispatch(setTimerId(setTimeout(() => dispatch(fetchStatus()), 3000)));
		});
	}
}

export function enableAutoClose()
{
	return (dispatch, getState) =>
	{
		console.log("enableAutoClose")
		//todo
	};
}