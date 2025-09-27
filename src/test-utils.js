import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";
import NavigationProvider from "./components/NavigationProvider";

// Create a custom render function that includes providers
export function renderWithProviders(
	ui,
	{
		preloadedState = {},
		store = createTestStore(preloadedState),
		...renderOptions
	} = {},
) {
	function Wrapper({ children }) {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<NavigationProvider>{children}</NavigationProvider>
				</BrowserRouter>
			</Provider>
		);
	}

	return {
		store,
		...render(ui, { wrapper: Wrapper, ...renderOptions }),
	};
}

// Create a test store
export function createTestStore(preloadedState = {}) {
	const defaultState = {
		house: {
			rooms: [],
			isFetching: false,
			timer: null,
			authError: false,
		},
	};

	return createStore(
		rootReducer,
		{ ...defaultState, ...preloadedState },
		applyMiddleware(thunk),
	);
}

// Mock fetch for API calls
export const mockFetch = (mockResponse = {}) => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve(mockResponse),
		}),
	);
};

// Reset fetch mock
export const resetFetchMock = () => {
	if (global.fetch && global.fetch.mockRestore) {
		global.fetch.mockRestore();
	}
};

// Mock room data for tests
export const mockRoomData = {
	rooms: [
		{
			id: "TestRoom",
			name: "Test Room",
			devices: [
				{
					id: "TestLight",
					name: "Test Light",
					status: "0",
					level: "50",
				},
			],
			totalLights: 1,
		},
	],
};

// Re-export everything from RTL
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
