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
	}
}

export function fetchStatusIfNecessary() {
	return (dispatch, getState) => {
		if (shouldFetchStatus(getState().house, dispatch)) {
			return dispatch(fetchStatus())
		}
	}
}
