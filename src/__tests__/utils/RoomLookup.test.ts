import {
	EMPTY_ROOM,
	findRoom,
	findRoomDevices,
	findRoomOrEmpty,
	toDeviceMap,
} from "../../utils/RoomLookup";
import type { Room } from "../../types";

const rooms: Room[] = [
	{
		id: "climate",
		name: "Climate",
		devices: [{ id: "t", name: "Thermostat" }],
	},
	{ id: "kitchen", name: "Kitchen", devices: [] },
];

describe("RoomLookup", () => {
	test("finds a room by name", () => {
		expect(findRoom(rooms, "Climate")?.id).toBe("climate");
	});

	test.each([null, undefined, [] as Room[]])(
		"survives a cold store (%s)",
		(cold) => {
			expect(findRoom(cold, "Climate")).toBeUndefined();
			expect(findRoomOrEmpty(cold, "Climate")).toBe(EMPTY_ROOM);
			expect(findRoomDevices(cold, "Climate")).toEqual([]);
		},
	);

	test("returns empties for a room the hub does not report", () => {
		expect(findRoom(rooms, "Garage")).toBeUndefined();
		expect(findRoomOrEmpty(rooms, "Garage").devices).toEqual([]);
		expect(findRoomDevices(rooms, "Garage")).toEqual([]);
	});

	test("keys devices by name", () => {
		expect(toDeviceMap(rooms[0].devices)).toEqual({
			Thermostat: { id: "t", name: "Thermostat" },
		});
		expect(toDeviceMap([])).toEqual({});
		expect(toDeviceMap(undefined)).toEqual({});
	});
});
