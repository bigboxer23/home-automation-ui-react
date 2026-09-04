import type { Device, DeviceMap, Room } from "../types";

/**
 * Lookups for the room-shaped payload returned by /SceneStatus.
 *
 * Every one of these has to survive a cold store: the app renders once with
 * `rooms: []` before the first poll lands, and again against whatever rooms the
 * hub actually reports, which need not include the one a page is built around.
 * Returning an empty value rather than `undefined` keeps that case a blank
 * panel instead of a render-time throw.
 */

/** Stand-in for a room the hub has not reported (yet, or at all). */
export const EMPTY_ROOM: Room = { id: "", name: "", devices: [] };

export const findRoom = (
	rooms: Room[] | null | undefined,
	name: string,
): Room | undefined => rooms?.find((theRoom: Room) => name === theRoom.name);

export const findRoomOrEmpty = (
	rooms: Room[] | null | undefined,
	name: string,
): Room => findRoom(rooms, name) ?? EMPTY_ROOM;

export const findRoomDevices = (
	rooms: Room[] | null | undefined,
	name: string,
): Device[] => findRoom(rooms, name)?.devices ?? [];

/** Devices keyed by name, which is how the climate pages address them. */
export const toDeviceMap = (devices: Device[] | null | undefined): DeviceMap =>
	(devices ?? []).reduce((map: DeviceMap, device: Device) => {
		map[device.name] = device;
		return map;
	}, {});
