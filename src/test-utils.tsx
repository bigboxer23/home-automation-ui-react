import React from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import type { Store } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";
import type { RootState } from "./types";

// Mock Router component for tests
const MockRouter = ({ children }: { children: React.ReactNode }) => (
	<div data-testid="mock-router">{children}</div>
);

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
	preloadedState?: Partial<RootState>;
	store?: Store;
}

// Create a custom render function that includes providers
export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = {},
		store = createTestStore(preloadedState),
		...renderOptions
	}: RenderWithProvidersOptions = {},
) {
	function Wrapper({ children }: { children: React.ReactNode }) {
		return (
			<Provider store={store}>
				<MockRouter>{children}</MockRouter>
			</Provider>
		);
	}

	return {
		store,
		...render(ui, { wrapper: Wrapper, ...renderOptions }),
	};
}

// Create a test store
export function createTestStore(preloadedState: Partial<RootState> = {}) {
	const defaultState: RootState = {
		house: {
			rooms: [],
			isFetching: false,
			timer: null,
			authError: false,
		},
	};

	return createStore(
		rootReducer,
		{ ...defaultState, ...preloadedState } as any,
		applyMiddleware(thunk),
	) as unknown as Store;
}

// Mock fetch for API calls
export const mockFetch = (mockResponse: any = {}) => {
	globalThis.fetch = vi.fn(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve(mockResponse),
		}),
	) as unknown as typeof fetch;
};

// Reset fetch mock
export const resetFetchMock = () => {
	if (globalThis.fetch && (globalThis.fetch as any).mockRestore) {
		(globalThis.fetch as any).mockRestore();
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
