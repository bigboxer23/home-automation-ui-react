import * as actions from "../../actions/index";
import { mockFetch, resetFetchMock } from "../../test-utils";

describe("Actions", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		resetFetchMock();
	});

	describe("fetchStatusIfNecessary", () => {
		test("dispatches fetch when not fetching and no timer", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { isFetching: false, timer: null },
			}));

			mockFetch({ rooms: [] });

			const action = actions.fetchStatusIfNecessary();
			action(dispatch, getState);

			expect(dispatch).toHaveBeenCalled();
		});

		test("does not dispatch when already fetching", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { isFetching: true, timer: null },
			}));

			const action = actions.fetchStatusIfNecessary();
			action(dispatch, getState);

			expect(dispatch).not.toHaveBeenCalled();
		});

		test("does not dispatch when timer exists", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { isFetching: false, timer: 123 },
			}));

			const action = actions.fetchStatusIfNecessary();
			action(dispatch, getState);

			expect(dispatch).not.toHaveBeenCalled();
		});
	});

	describe("setDimLocal", () => {
		test("dispatches correct actions", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { timer: null },
			}));

			const action = actions.setDimLocal(75, "TestLight");
			action(dispatch, getState);

			expect(dispatch).toHaveBeenCalledWith({
				type: "UPDATE_DIM",
				id: "TestLight",
				level: 75,
			});
		});
	});

	describe("sceneClicked", () => {
		test("dispatches correct actions for scene click", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { rooms: [] },
			}));

			mockFetch();

			const action = actions.sceneClicked("TestScene", "ON");
			action(dispatch, getState);

			expect(dispatch).toHaveBeenCalledWith({
				type: "REQUEST_STATUS",
			});
			expect(global.fetch).toHaveBeenCalledWith(
				"/S/OpenHAB/TestScene/ON",
				expect.any(Object),
			);
		});
	});
});
