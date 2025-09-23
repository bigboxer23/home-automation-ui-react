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

	describe("setDim", () => {
		test("makes API call with correct parameters", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { timer: null },
			}));

			mockFetch();

			const action = actions.setDim(75, "TestLight");
			action(dispatch, getState);

			expect(global.fetch).toHaveBeenCalledWith(
				"/S/OpenHAB/TestLight/75",
				expect.any(Object),
			);
		});
	});

	describe("setOnOff", () => {
		test("dispatches correct actions and makes API call for turning on", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { timer: null },
			}));

			mockFetch();

			const action = actions.setOnOff(true, "TestLight");
			action(dispatch, getState);

			expect(dispatch).toHaveBeenCalledWith({
				type: "UPDATE_ON_OFF",
				id: "TestLight",
				on: true,
			});
			expect(global.fetch).toHaveBeenCalledWith(
				"/S/OpenHAB/TestLight/ON",
				expect.any(Object),
			);
		});

		test("dispatches correct actions and makes API call for turning off", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { timer: null },
			}));

			mockFetch();

			const action = actions.setOnOff(false, "TestLight");
			action(dispatch, getState);

			expect(dispatch).toHaveBeenCalledWith({
				type: "UPDATE_ON_OFF",
				id: "TestLight",
				on: false,
			});
			expect(global.fetch).toHaveBeenCalledWith(
				"/S/OpenHAB/TestLight/OFF",
				expect.any(Object),
			);
		});
	});

	describe("roomClicked", () => {
		test("dispatches correct actions when room exists", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: {
					rooms: [{ id: "TestRoom", name: "Test Room" }],
					timer: null,
				},
			}));

			mockFetch();

			const action = actions.roomClicked("TestRoom", "ON");
			action(dispatch, getState);

			expect(dispatch).toHaveBeenCalledWith({
				type: "REQUEST_STATUS",
			});
			expect(dispatch).toHaveBeenCalledWith({
				type: "ROOM_CLICKED",
				room: "TestRoom",
			});
			expect(global.fetch).toHaveBeenCalledWith(
				"/S/OpenHAB/TestRoom/ON",
				expect.any(Object),
			);
		});

		test("does not dispatch actions when room does not exist", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: {
					rooms: [{ id: "OtherRoom", name: "Other Room" }],
					timer: null,
				},
			}));

			const action = actions.roomClicked("NonExistentRoom", "ON");
			action(dispatch, getState);

			expect(dispatch).not.toHaveBeenCalled();
			expect(global.fetch).not.toHaveBeenCalled();
		});
	});

	describe("garageClicked", () => {
		test("dispatches correct actions for garage operation", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { timer: null },
			}));

			mockFetch();

			const action = actions.garageClicked("open");
			action(dispatch, getState);

			expect(dispatch).toHaveBeenCalledWith({
				type: "REQUEST_STATUS",
			});
			expect(dispatch).toHaveBeenCalledWith({
				type: "GARAGE_STATE_CHANGE",
				state: "open",
			});
			expect(global.fetch).toHaveBeenCalledWith(
				"/S/Garage/open",
				expect.any(Object),
			);
		});
	});

	describe("fanModeChange", () => {
		test("dispatches correct actions for fan mode change", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { rooms: [] },
			}));

			mockFetch();

			const action = actions.fanModeChange("AUTO");
			action(dispatch, getState);

			expect(dispatch).toHaveBeenCalledWith({
				type: "REQUEST_STATUS",
			});
			expect(global.fetch).toHaveBeenCalledWith(
				"/S/OpenHAB/ThermostatFanMode/AUTO",
				expect.any(Object),
			);
		});
	});

	describe("hvacModeChange", () => {
		test("dispatches correct actions for HVAC mode change", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { rooms: [] },
			}));

			mockFetch();

			const action = actions.hvacModeChange("HEAT");
			action(dispatch, getState);

			expect(dispatch).toHaveBeenCalledWith({
				type: "REQUEST_STATUS",
			});
			expect(global.fetch).toHaveBeenCalledWith(
				"/S/OpenHAB/ThermostatMode/HEAT",
				expect.any(Object),
			);
		});
	});

	describe("setLocalThermostatSetPoint", () => {
		test("dispatches correct actions for local setpoint change", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { timer: null },
			}));

			const action = actions.setLocalThermostatSetPoint(72);
			action(dispatch, getState);

			expect(dispatch).toHaveBeenCalledWith({
				type: "UPDATE_THERMOSTAT_SET_POINT",
				setPoint: 72,
			});
		});
	});

	describe("disableAutoClose", () => {
		test("dispatches correct actions for garage auto close", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { timer: null },
			}));

			mockFetch();

			const action = actions.disableAutoClose(30);
			action(dispatch, getState);

			expect(dispatch).toHaveBeenCalledWith({
				type: "REQUEST_STATUS",
			});
			expect(global.fetch).toHaveBeenCalledWith(
				"/S/Garage/SetAutoCloseDelay/30",
				expect.any(Object),
			);
		});
	});

	describe("setMeuralOn", () => {
		test("makes API call for wakeup when turning on", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { rooms: [] },
			}));

			// Mock document.cookie for XSRF token
			Object.defineProperty(document, "cookie", {
				writable: true,
				value: "XSRF-TOKEN=test-token",
			});

			mockFetch();

			const action = actions.setMeuralOn(true);
			action(dispatch, getState);

			expect(global.fetch).toHaveBeenCalledWith(
				expect.objectContaining({
					url: "/S/meural/wakeup",
					method: "POST",
				}),
				expect.any(Object),
			);
		});

		test("makes API call for sleep when turning off", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { rooms: [] },
			}));

			// Mock document.cookie for XSRF token
			Object.defineProperty(document, "cookie", {
				writable: true,
				value: "XSRF-TOKEN=test-token",
			});

			mockFetch();

			const action = actions.setMeuralOn(false);
			action(dispatch, getState);

			expect(global.fetch).toHaveBeenCalledWith(
				expect.objectContaining({
					url: "/S/meural/sleep",
					method: "POST",
				}),
				expect.any(Object),
			);
		});
	});

	describe("nextMeuralImage", () => {
		test("makes API call for next picture", () => {
			// Mock document.cookie for XSRF token
			Object.defineProperty(document, "cookie", {
				writable: true,
				value: "XSRF-TOKEN=test-token",
			});

			mockFetch();

			actions.nextMeuralImage();

			expect(global.fetch).toHaveBeenCalledWith(
				expect.objectContaining({
					url: "/S/meural/nextPicture",
					method: "POST",
				}),
				expect.any(Object),
			);
		});
	});

	describe("previousMeuralImage", () => {
		test("makes API call for previous picture", () => {
			// Mock document.cookie for XSRF token
			Object.defineProperty(document, "cookie", {
				writable: true,
				value: "XSRF-TOKEN=test-token",
			});

			mockFetch();

			actions.previousMeuralImage();

			expect(global.fetch).toHaveBeenCalledWith(
				expect.objectContaining({
					url: "/S/meural/prevPicture",
					method: "POST",
				}),
				expect.any(Object),
			);
		});
	});

	describe("setMeuralSource", () => {
		test("makes API call for source change", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { rooms: [] },
			}));

			// Mock document.cookie for XSRF token
			Object.defineProperty(document, "cookie", {
				writable: true,
				value: "XSRF-TOKEN=test-token",
			});

			mockFetch();

			const action = actions.setMeuralSource(2);
			action(dispatch, getState);

			expect(global.fetch).toHaveBeenCalledWith(
				expect.objectContaining({
					url: "/S/meural/changeSource?source=2",
					method: "POST",
				}),
				expect.any(Object),
			);
		});
	});

	describe("updateOpenAIQuality", () => {
		test("makes API call with quality parameter", () => {
			// Mock document.cookie for XSRF token
			Object.defineProperty(document, "cookie", {
				writable: true,
				value: "XSRF-TOKEN=test-token",
			});

			mockFetch();

			actions.updateOpenAIQuality("high");

			expect(global.fetch).toHaveBeenCalledWith(
				expect.objectContaining({
					url: "/S/meural/updateOpenAIQuality?quality=high",
					method: "POST",
				}),
				expect.any(Object),
			);
		});
	});

	describe("updateOpenAIStyle", () => {
		test("makes API call with style parameter", () => {
			// Mock document.cookie for XSRF token
			Object.defineProperty(document, "cookie", {
				writable: true,
				value: "XSRF-TOKEN=test-token",
			});

			mockFetch();

			actions.updateOpenAIStyle("realistic");

			expect(global.fetch).toHaveBeenCalledWith(
				expect.objectContaining({
					url: "/S/meural/updateOpenAIStyle?style=realistic",
					method: "POST",
				}),
				expect.any(Object),
			);
		});
	});

	describe("updateOpenAIPrompt", () => {
		test("makes API call with prompt parameter", () => {
			// Mock document.cookie for XSRF token
			Object.defineProperty(document, "cookie", {
				writable: true,
				value: "XSRF-TOKEN=test-token",
			});

			mockFetch();

			actions.updateOpenAIPrompt("a beautiful sunset");

			expect(global.fetch).toHaveBeenCalledWith(
				expect.objectContaining({
					url: "/S/meural/updateOpenAIPrompt?prompt=a%20beautiful%20sunset",
					method: "POST",
				}),
				expect.any(Object),
			);
		});
	});

	describe("showInfo", () => {
		test("makes API call to show info", () => {
			// Mock document.cookie for XSRF token
			Object.defineProperty(document, "cookie", {
				writable: true,
				value: "XSRF-TOKEN=test-token",
			});

			mockFetch();

			actions.showInfo();

			expect(global.fetch).toHaveBeenCalledWith(
				expect.objectContaining({
					url: "/S/meural/showInfo",
					method: "POST",
				}),
				expect.any(Object),
			);
		});
	});

	describe("hideInfo", () => {
		test("makes API call to hide info", () => {
			// Mock document.cookie for XSRF token
			Object.defineProperty(document, "cookie", {
				writable: true,
				value: "XSRF-TOKEN=test-token",
			});

			mockFetch();

			actions.hideInfo();

			expect(global.fetch).toHaveBeenCalledWith(
				expect.objectContaining({
					url: "/S/meural/hideInfo",
					method: "POST",
				}),
				expect.any(Object),
			);
		});
	});

	describe("cancelFetchTimer", () => {
		test("clears timer and dispatches setTimerId when timer exists", () => {
			const mockTimerId = 123;
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { timer: mockTimerId },
			}));

			// Mock clearTimeout
			const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

			const action = actions.cancelFetchTimer();
			action(dispatch, getState);

			expect(clearTimeoutSpy).toHaveBeenCalledWith(mockTimerId);
			expect(dispatch).toHaveBeenCalledWith({
				type: "SET_TIMER_ID",
				timer: null,
			});

			clearTimeoutSpy.mockRestore();
		});

		test("does nothing when timer is null", () => {
			const dispatch = jest.fn();
			const getState = jest.fn(() => ({
				house: { timer: null },
			}));

			// Mock clearTimeout
			const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

			const action = actions.cancelFetchTimer();
			action(dispatch, getState);

			expect(clearTimeoutSpy).not.toHaveBeenCalled();
			expect(dispatch).not.toHaveBeenCalled();

			clearTimeoutSpy.mockRestore();
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
