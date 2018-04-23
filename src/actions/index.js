export const statusUpdated = data => ({
	type: 'STATUS_UPDATED',
	data
});

export const updateStoreRoom = room => ({
	type: 'ROOM_CLICKED',
	room
});

export const requestStatus = function() {
	return {
		type: "REQUEST_STATUS"
	}
};

const shouldFetchStatus = function(state, dispatch)
{
	if (state.isFetching)
	{
		scheduleFetch(dispatch);
		return false;
	}
	return true;
};

const scheduleFetch = function(dispatch)
{
	setTimeout(() => dispatch(fetchStatusIfNecessary()), 3000);
};

const fetchStatus = function() {
	return dispatch => {
		dispatch(requestStatus());
		return fetch("SceneStatus").then(theResults =>
		{
			return theResults.json();
		}).then(theData =>
		{
			if (theData != null && theData.rooms != null)
			{
				dispatch(statusUpdated(theData.rooms));
			}
		}).finally(() => scheduleFetch(dispatch));
	}
};

export function garageClicked(action)
{
	return () => {
		fetch("S/Garage/" + action);
	}
}

export function roomClicked(id, state)
{
	return (dispatch, getState) => {
		let aRoom = getState().house.rooms.find(theRoom => theRoom.id === id);
		if (aRoom != null)
		{
			dispatch(requestStatus());
			dispatch(updateStoreRoom(id));
			fetch("S/Vera/Room/" + id + "/SwitchPower1&action=SetTarget&newTargetValue=" + state).finally(() => {
				dispatch(statusUpdated(getState().house.rooms));
			});
		}
	};
}

export function sceneClicked(id)
{
	return (dispatch, getState) =>
	{
		dispatch(requestStatus());
		fetch("S/Vera/Scene/" + id + "/HomeAutomationGateway1&action=RunScene").finally(() => {
			dispatch(statusUpdated(getState().house.rooms));
		});
	};
}
export function fetchStatusIfNecessary() {
	return (dispatch, getState) => {
		if (shouldFetchStatus(getState().house, dispatch)) {
			return dispatch(fetchStatus())
		}
	}
}

export function fanModeChange(action, id)
{
	return (dispatch, getState) =>
	{
		dispatch(requestStatus());
		fetch("S/Vera/Device/" + id + "/HVAC_FanOperatingMode1&action=SetMode&NewMode=" + action).finally(() => {
			dispatch(statusUpdated(getState().house.rooms));
		});
	}
}

export function hvacModeChange(action, id)
{
	return (dispatch, getState) =>
	{
		dispatch(requestStatus());
		fetch("S/Vera/Device/" + id + "/HVAC_UserOperatingMode1&action=SetModeTarget&NewModeTarget=" + action).finally(() => {
			dispatch(statusUpdated(getState().house.rooms));
		});
	}
}
