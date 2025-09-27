// Temporary compatibility layer for connected-react-router migration
// This allows us to gradually migrate components without breaking the build

let navigationInstance = null;

// Set the navigation instance (called from a component that has useNavigate)
export const setNavigationInstance = (navigate) => {
	navigationInstance = navigate;
};

// Push function that works like connected-react-router's push
// Returns a thunk action that can be dispatched
export const push = (path) => {
	return (dispatch) => {
		if (navigationInstance) {
			navigationInstance(path);
		} else {
			// Fallback to window.location if navigate is not available
			window.location.href = path;
		}
		// Return a dummy action to keep Redux happy
		return {
			type: "@@router/NAVIGATE",
			payload: { path },
		};
	};
};

// Get navigation instance
export const getNavigationInstance = () => navigationInstance;
