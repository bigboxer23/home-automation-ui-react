import roomReducer from "../../reducers/RoomReducer";

describe("roomReducer", () => {
	let initialState;
	let mockRooms;

	beforeEach(() => {
		mockRooms = [
			{
				id: "room1",
				name: "Living Room",
				devices: [
					{
						id: "device1",
						name: "Main Light",
						category: "2",
						status: "0",
						level: "50",
					},
					{
						id: "device2",
						name: "Table Lamp",
						category: "2",
						status: "1",
						level: "75",
					},
				],
			},
			{
				id: "room2",
				name: "Garage",
				devices: [
					{
						id: "device3",
						name: "Garage Opener",
						door: false,
					},
				],
			},
			{
				id: "room3",
				name: "Climate",
				devices: [
					{
						id: "device4",
						name: "Heating Setpoint",
						level: "70",
					},
					{
						id: "device5",
						name: "Cooling Setpoint",
						level: "75",
					},
				],
			},
		];

		initialState = {
			rooms: mockRooms,
			isFetching: false,
			timer: null,
			authError: false,
			lastUpdate: 1234567890,
		};
	});

	describe("default behavior", () => {
		test("returns initial state when no state provided", () => {
			const result = roomReducer(undefined, { type: "UNKNOWN_ACTION" });
			expect(result).toEqual({
				rooms: [],
				isFetching: false,
				timer: null,
				authError: false,
			});
		});

		test("returns current state for unknown action", () => {
			const result = roomReducer(initialState, { type: "UNKNOWN_ACTION" });
			expect(result).toEqual(initialState);
		});
	});

	describe("STATUS_UPDATED", () => {
		test("updates rooms data and sets fetching to false", () => {
			const newRooms = [
				{
					id: "newRoom",
					name: "New Room",
					devices: [{ id: "newDevice", name: "New Device" }],
				},
			];

			const action = {
				type: "STATUS_UPDATED",
				data: newRooms,
			};

			const result = roomReducer({ ...initialState, isFetching: true }, action);

			expect(result.rooms).toEqual(newRooms);
			expect(result.isFetching).toBe(false);
			expect(result.lastUpdate).toBeGreaterThan(initialState.lastUpdate);
			expect(result.timer).toBe(initialState.timer);
		});

		test("preserves other state properties", () => {
			const action = {
				type: "STATUS_UPDATED",
				data: [],
			};

			const stateWithTimer = {
				...initialState,
				timer: "someTimerId",
				authError: true,
			};

			const result = roomReducer(stateWithTimer, action);

			expect(result.timer).toBe("someTimerId");
			expect(result.authError).toBe(true);
		});
	});

	describe("ROOM_CLICKED", () => {
		test("toggles room devices from off to on", () => {
			// Room with all lights off (status "0")
			const roomOffState = {
				...initialState,
				rooms: [
					{
						id: "room1",
						name: "Living Room",
						devices: [
							{
								id: "device1",
								name: "Main Light",
								category: "2",
								status: "0",
								level: "50",
							},
							{
								id: "device2",
								name: "Table Lamp",
								category: "2",
								status: "0",
								level: "75",
							},
						],
					},
				],
			};

			const action = {
				type: "ROOM_CLICKED",
				room: "room1",
			};

			const result = roomReducer(roomOffState, action);

			expect(result.isFetching).toBe(true);
			expect(result.rooms[0].devices[0].status).toBe("1");
			expect(result.rooms[0].devices[1].status).toBe("1");
			expect(result.lastUpdate).toBeGreaterThan(initialState.lastUpdate);
		});

		test("toggles room devices from on to off", () => {
			// Room with lights on (status "1")
			const roomOnState = {
				...initialState,
				rooms: [
					{
						id: "room1",
						name: "Living Room",
						devices: [
							{
								id: "device1",
								name: "Main Light",
								category: "2",
								status: "1",
								level: "50",
							},
							{
								id: "device2",
								name: "Table Lamp",
								category: "2",
								status: "1",
								level: "75",
							},
						],
					},
				],
			};

			const action = {
				type: "ROOM_CLICKED",
				room: "room1",
			};

			const result = roomReducer(roomOnState, action);

			expect(result.isFetching).toBe(true);
			expect(result.rooms[0].devices[0].status).toBe("0");
			expect(result.rooms[0].devices[1].status).toBe("0");
		});

		test("ignores override devices", () => {
			const stateWithOverride = {
				...initialState,
				rooms: [
					{
						id: "room1",
						name: "Living Room",
						devices: [
							{
								id: "device1",
								name: "Main Light",
								category: "2",
								status: "0",
								level: "50",
							},
							{
								id: "device2",
								name: "Override Switch",
								category: "2",
								status: "1",
								level: "100",
							},
						],
					},
				],
			};

			const action = {
				type: "ROOM_CLICKED",
				room: "room1",
			};

			const result = roomReducer(stateWithOverride, action);

			// Main light should toggle to on
			expect(result.rooms[0].devices[0].status).toBe("1");
			// Override device should remain unchanged
			expect(result.rooms[0].devices[1].status).toBe("1");
			expect(result.rooms[0].devices[1].name).toBe("Override Switch");
		});

		test("only affects the specified room", () => {
			const action = {
				type: "ROOM_CLICKED",
				room: "room1",
			};

			const result = roomReducer(initialState, action);

			// Room 1 devices should be affected
			expect(result.rooms[0].id).toBe("room1");
			// Room has device2 with status "1", so room is "on", clicking toggles to "off"
			expect(result.rooms[0].devices[0].status).toBe("0"); // was "0", stays "0" (all devices off)
			expect(result.rooms[0].devices[1].status).toBe("0"); // was "1", now "0" (toggled off)

			// Other rooms should remain unchanged
			expect(result.rooms[1]).toEqual(initialState.rooms[1]);
			expect(result.rooms[2]).toEqual(initialState.rooms[2]);
		});
	});

	describe("GARAGE_STATE_CHANGE", () => {
		test("updates garage door state to open", () => {
			const action = {
				type: "GARAGE_STATE_CHANGE",
				state: "Open",
			};

			const result = roomReducer(initialState, action);

			expect(result.isFetching).toBe(true);
			expect(result.lastUpdate).toBeGreaterThan(initialState.lastUpdate);

			const garageRoom = result.rooms.find((room) => room.name === "Garage");
			const garageOpener = garageRoom.devices.find(
				(device) => device.name === "Garage Opener",
			);
			expect(garageOpener.door).toBe(true);
		});

		test("updates garage door state to closed", () => {
			const action = {
				type: "GARAGE_STATE_CHANGE",
				state: "Closed",
			};

			const result = roomReducer(initialState, action);

			const garageRoom = result.rooms.find((room) => room.name === "Garage");
			const garageOpener = garageRoom.devices.find(
				(device) => device.name === "Garage Opener",
			);
			expect(garageOpener.door).toBe(false);
		});

		test("only affects Garage Opener device in Garage room", () => {
			const stateWithMultipleGarageDevices = {
				...initialState,
				rooms: [
					...initialState.rooms.slice(0, 1),
					{
						id: "room2",
						name: "Garage",
						devices: [
							{
								id: "device3",
								name: "Garage Opener",
								door: false,
							},
							{
								id: "device6",
								name: "Garage Light",
								status: "0",
							},
						],
					},
					...initialState.rooms.slice(2),
				],
			};

			const action = {
				type: "GARAGE_STATE_CHANGE",
				state: "Open",
			};

			const result = roomReducer(stateWithMultipleGarageDevices, action);

			const garageRoom = result.rooms.find((room) => room.name === "Garage");
			expect(garageRoom.devices[0].door).toBe(true); // Garage Opener updated
			expect(garageRoom.devices[1].status).toBe("0"); // Garage Light unchanged
		});

		test("does not affect non-garage rooms", () => {
			const action = {
				type: "GARAGE_STATE_CHANGE",
				state: "Open",
			};

			const result = roomReducer(initialState, action);

			// Non-garage rooms should be unchanged
			expect(result.rooms[0]).toEqual(initialState.rooms[0]);
			expect(result.rooms[2]).toEqual(initialState.rooms[2]);
		});
	});

	describe("REQUEST_STATUS", () => {
		test("sets isFetching to true", () => {
			const action = { type: "REQUEST_STATUS" };
			const result = roomReducer(initialState, action);

			expect(result.isFetching).toBe(true);
			expect(result.rooms).toEqual(initialState.rooms);
			expect(result.timer).toBe(initialState.timer);
			expect(result.authError).toBe(initialState.authError);
		});

		test("preserves all other state properties", () => {
			const stateWithData = {
				...initialState,
				customProperty: "should be preserved",
			};

			const action = { type: "REQUEST_STATUS" };
			const result = roomReducer(stateWithData, action);

			expect(result.customProperty).toBe("should be preserved");
		});
	});

	describe("SET_TIMER_ID", () => {
		test("sets timer id", () => {
			const action = {
				type: "SET_TIMER_ID",
				timer: "newTimerId123",
			};

			const result = roomReducer(initialState, action);

			expect(result.timer).toBe("newTimerId123");
			expect(result.rooms).toEqual(initialState.rooms);
			expect(result.isFetching).toBe(initialState.isFetching);
		});

		test("can clear timer by setting to null", () => {
			const stateWithTimer = {
				...initialState,
				timer: "existingTimer",
			};

			const action = {
				type: "SET_TIMER_ID",
				timer: null,
			};

			const result = roomReducer(stateWithTimer, action);

			expect(result.timer).toBeNull();
		});
	});

	describe("UPDATE_THERMOSTAT_SET_POINT", () => {
		test("updates heating setpoint in climate room", () => {
			const action = {
				type: "UPDATE_THERMOSTAT_SET_POINT",
				setPoint: 72,
			};

			const result = roomReducer(initialState, action);

			expect(result.lastUpdate).toBeGreaterThan(initialState.lastUpdate);

			const climateRoom = result.rooms.find((room) => room.name === "Climate");
			const heatingSetpoint = climateRoom.devices.find(
				(device) => device.name === "Heating Setpoint",
			);
			expect(heatingSetpoint.level).toBe("72");

			const coolingSetpoint = climateRoom.devices.find(
				(device) => device.name === "Cooling Setpoint",
			);
			expect(coolingSetpoint.level).toBe("72");
		});

		test("converts numeric setpoint to string", () => {
			const action = {
				type: "UPDATE_THERMOSTAT_SET_POINT",
				setPoint: 68.5,
			};

			const result = roomReducer(initialState, action);

			const climateRoom = result.rooms.find((room) => room.name === "Climate");
			const heatingSetpoint = climateRoom.devices.find(
				(device) => device.name === "Heating Setpoint",
			);
			expect(heatingSetpoint.level).toBe("68.5");
		});

		test("only affects Climate room", () => {
			const action = {
				type: "UPDATE_THERMOSTAT_SET_POINT",
				setPoint: 75,
			};

			const result = roomReducer(initialState, action);

			// Non-climate rooms should be unchanged
			expect(result.rooms[0]).toEqual(initialState.rooms[0]);
			expect(result.rooms[1]).toEqual(initialState.rooms[1]);
		});

		test("only affects heating and cooling setpoints", () => {
			const stateWithExtraClimateDevices = {
				...initialState,
				rooms: [
					...initialState.rooms.slice(0, 2),
					{
						id: "room3",
						name: "Climate",
						devices: [
							{
								id: "device4",
								name: "Heating Setpoint",
								level: "70",
							},
							{
								id: "device5",
								name: "Cooling Setpoint",
								level: "75",
							},
							{
								id: "device6",
								name: "Temperature Sensor",
								level: "72",
							},
						],
					},
				],
			};

			const action = {
				type: "UPDATE_THERMOSTAT_SET_POINT",
				setPoint: 68,
			};

			const result = roomReducer(stateWithExtraClimateDevices, action);

			const climateRoom = result.rooms.find((room) => room.name === "Climate");
			expect(climateRoom.devices[0].level).toBe("68"); // Heating updated
			expect(climateRoom.devices[1].level).toBe("68"); // Cooling updated
			expect(climateRoom.devices[2].level).toBe("72"); // Temperature sensor unchanged
		});
	});

	describe("UPDATE_ON_OFF", () => {
		test("turns device on (level 100)", () => {
			const action = {
				type: "UPDATE_ON_OFF",
				id: "device1",
				on: true,
			};

			const result = roomReducer(initialState, action);

			expect(result.lastUpdate).toBeGreaterThan(initialState.lastUpdate);

			const device = result.rooms[0].devices.find((d) => d.id === "device1");
			expect(device.level).toBe("100");
		});

		test("turns device off (level 0)", () => {
			const action = {
				type: "UPDATE_ON_OFF",
				id: "device2",
				on: false,
			};

			const result = roomReducer(initialState, action);

			const device = result.rooms[0].devices.find((d) => d.id === "device2");
			expect(device.level).toBe("0");
		});

		test("only affects the specified device", () => {
			const action = {
				type: "UPDATE_ON_OFF",
				id: "device1",
				on: true,
			};

			const result = roomReducer(initialState, action);

			// device1 should be updated
			expect(result.rooms[0].devices[0].level).toBe("100");
			// device2 should remain unchanged
			expect(result.rooms[0].devices[1].level).toBe("75");
		});

		test("does not affect devices in other rooms", () => {
			const action = {
				type: "UPDATE_ON_OFF",
				id: "device1",
				on: true,
			};

			const result = roomReducer(initialState, action);

			// Other rooms should be unchanged
			expect(result.rooms[1]).toEqual(initialState.rooms[1]);
			expect(result.rooms[2]).toEqual(initialState.rooms[2]);
		});

		test("handles device not found gracefully", () => {
			const action = {
				type: "UPDATE_ON_OFF",
				id: "nonexistentDevice",
				on: true,
			};

			const result = roomReducer(initialState, action);

			// State should be unchanged except for lastUpdate
			expect(result.rooms).toEqual(initialState.rooms);
			expect(result.lastUpdate).toBeGreaterThan(initialState.lastUpdate);
		});
	});

	describe("UPDATE_DIM", () => {
		test("dims whole room when id matches room id", () => {
			const action = {
				type: "UPDATE_DIM",
				id: "room1",
				level: "80",
			};

			const result = roomReducer(initialState, action);

			expect(result.lastUpdate).toBeGreaterThan(initialState.lastUpdate);

			// Only category "2" devices should be updated
			const room = result.rooms[0];
			expect(room.devices[0].level).toBe("80"); // category "2"
			expect(room.devices[1].level).toBe("80"); // category "2"
		});

		test("only affects category 2 devices for whole room dimming", () => {
			const stateWithMixedDevices = {
				...initialState,
				rooms: [
					{
						id: "room1",
						name: "Living Room",
						devices: [
							{
								id: "device1",
								name: "Main Light",
								category: "2", // should be updated
								level: "50",
							},
							{
								id: "device2",
								name: "Fan",
								category: "3", // should NOT be updated
								level: "60",
							},
							{
								id: "device3",
								name: "Sensor",
								category: "1", // should NOT be updated
								level: "70",
							},
						],
					},
				],
			};

			const action = {
				type: "UPDATE_DIM",
				id: "room1",
				level: "90",
			};

			const result = roomReducer(stateWithMixedDevices, action);

			expect(result.rooms[0].devices[0].level).toBe("90"); // category "2" updated
			expect(result.rooms[0].devices[1].level).toBe("60"); // category "3" unchanged
			expect(result.rooms[0].devices[2].level).toBe("70"); // category "1" unchanged
		});

		test("dims individual device when id matches device id", () => {
			const action = {
				type: "UPDATE_DIM",
				id: "device2",
				level: "25",
			};

			const result = roomReducer(initialState, action);

			// Only device2 should be updated
			expect(result.rooms[0].devices[0].level).toBe("50"); // unchanged
			expect(result.rooms[0].devices[1].level).toBe("25"); // updated
		});

		test("handles device not found in any room", () => {
			const action = {
				type: "UPDATE_DIM",
				id: "nonexistentDevice",
				level: "30",
			};

			const result = roomReducer(initialState, action);

			// All devices should remain unchanged
			expect(result.rooms).toEqual(initialState.rooms);
			expect(result.lastUpdate).toBeGreaterThan(initialState.lastUpdate);
		});

		test("only affects the room containing the device", () => {
			const action = {
				type: "UPDATE_DIM",
				id: "device1", // in room1
				level: "40",
			};

			const result = roomReducer(initialState, action);

			// Room1 device should be updated
			expect(result.rooms[0].devices[0].level).toBe("40");
			// Other rooms should be unchanged
			expect(result.rooms[1]).toEqual(initialState.rooms[1]);
			expect(result.rooms[2]).toEqual(initialState.rooms[2]);
		});
	});

	describe("AUTH_ERROR", () => {
		test("sets authError to true", () => {
			const action = {
				type: "AUTH_ERROR",
				authError: true,
			};

			const result = roomReducer(initialState, action);

			expect(result.authError).toBe(true);
			expect(result.rooms).toEqual(initialState.rooms);
			expect(result.isFetching).toBe(initialState.isFetching);
			expect(result.timer).toBe(initialState.timer);
		});

		test("sets authError to false", () => {
			const stateWithAuthError = {
				...initialState,
				authError: true,
			};

			const action = {
				type: "AUTH_ERROR",
				authError: false,
			};

			const result = roomReducer(stateWithAuthError, action);

			expect(result.authError).toBe(false);
		});

		test("preserves all other state properties", () => {
			const action = {
				type: "AUTH_ERROR",
				authError: true,
			};

			const result = roomReducer(initialState, action);

			expect(result.rooms).toEqual(initialState.rooms);
			expect(result.isFetching).toBe(initialState.isFetching);
			expect(result.timer).toBe(initialState.timer);
			expect(result.lastUpdate).toBe(initialState.lastUpdate);
		});
	});

	describe("state immutability", () => {
		test("does not mutate original state", () => {
			const originalState = { ...initialState };
			const action = {
				type: "REQUEST_STATUS",
			};

			const result = roomReducer(initialState, action);

			expect(initialState).toEqual(originalState);
			expect(result).not.toBe(initialState);
		});

		test("does not mutate rooms array", () => {
			const originalRooms = [...initialState.rooms];
			const action = {
				type: "UPDATE_DIM",
				id: "device1",
				level: "80",
			};

			const result = roomReducer(initialState, action);

			expect(initialState.rooms).toEqual(originalRooms);
			expect(result.rooms).not.toBe(initialState.rooms);
		});

		test("does not mutate individual room objects", () => {
			const originalRoom = { ...initialState.rooms[0] };
			const action = {
				type: "UPDATE_DIM",
				id: "device1",
				level: "80",
			};

			const result = roomReducer(initialState, action);

			expect(initialState.rooms[0]).toEqual(originalRoom);
			expect(result.rooms[0]).not.toBe(initialState.rooms[0]);
		});

		test("does not mutate device objects", () => {
			const originalDevice = { ...initialState.rooms[0].devices[0] };
			const action = {
				type: "UPDATE_DIM",
				id: "device1",
				level: "80",
			};

			const result = roomReducer(initialState, action);

			expect(initialState.rooms[0].devices[0]).toEqual(originalDevice);
			expect(result.rooms[0].devices[0]).not.toBe(
				initialState.rooms[0].devices[0],
			);
		});
	});
});
