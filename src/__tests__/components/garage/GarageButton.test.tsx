import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils";
import GarageButton from "../../../components/garage/GarageButton";

describe("GarageButton", () => {
	const mockHandleGarageClick = vi.fn();
	const mockHandleGarageMoreClick = vi.fn();

	const mockRoomClosed = {
		id: "garage",
		name: "Garage",
		devices: [
			{
				id: "garage-opener",
				name: "Garage Opener",
				status: "false",
				temperature: 72,
				historicOpenTime: 1640995200000, // Jan 1, 2022 12:00:00 AM UTC
				autoClose: 300000, // 5 minutes in milliseconds
			},
		],
	} as any;

	const mockRoomOpen = {
		id: "garage",
		name: "Garage",
		devices: [
			{
				id: "garage-opener",
				name: "Garage Opener",
				status: "true",
				temperature: 75,
				historicOpenTime: 1640995200000,
				autoClose: 3900000, // 1 hour 5 minutes in milliseconds
			},
		],
	} as any;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders garage button with room name", () => {
		renderWithProviders(
			<GarageButton
				room={mockRoomClosed}
				handleGarageClick={mockHandleGarageClick}
				handleGarageMoreClick={mockHandleGarageMoreClick}
			/>,
		);

		expect(screen.getByText("Garage")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("displays garage icon", () => {
		renderWithProviders(
			<GarageButton
				room={mockRoomClosed}
				handleGarageClick={mockHandleGarageClick}
				handleGarageMoreClick={mockHandleGarageMoreClick}
			/>,
		);

		const icon = document.querySelector(".mdi-garage");
		expect(icon).toBeInTheDocument();
	});

	test("displays temperature", () => {
		renderWithProviders(
			<GarageButton
				room={mockRoomClosed}
				handleGarageClick={mockHandleGarageClick}
				handleGarageMoreClick={mockHandleGarageMoreClick}
			/>,
		);

		expect(screen.getByText("72°")).toBeInTheDocument();
	});

	test("calls handleGarageClick with 'Open' when door is closed", () => {
		renderWithProviders(
			<GarageButton
				room={mockRoomClosed}
				handleGarageClick={mockHandleGarageClick}
				handleGarageMoreClick={mockHandleGarageMoreClick}
			/>,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(mockHandleGarageClick).toHaveBeenCalledWith("Open");
	});

	test("calls handleGarageClick with 'Close' when door is open", () => {
		renderWithProviders(
			<GarageButton
				room={mockRoomOpen}
				handleGarageClick={mockHandleGarageClick}
				handleGarageMoreClick={mockHandleGarageMoreClick}
			/>,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(mockHandleGarageClick).toHaveBeenCalledWith("Close");
	});

	test("applies danger variant when door is open", () => {
		renderWithProviders(
			<GarageButton
				room={mockRoomOpen}
				handleGarageClick={mockHandleGarageClick}
				handleGarageMoreClick={mockHandleGarageMoreClick}
			/>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("btn-danger");
	});

	test("applies default variant when door is closed", () => {
		renderWithProviders(
			<GarageButton
				room={mockRoomClosed}
				handleGarageClick={mockHandleGarageClick}
				handleGarageMoreClick={mockHandleGarageMoreClick}
			/>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("btn-default");
	});

	test("calls handleGarageMoreClick when temperature is clicked", () => {
		renderWithProviders(
			<GarageButton
				room={mockRoomClosed}
				handleGarageClick={mockHandleGarageClick}
				handleGarageMoreClick={mockHandleGarageMoreClick}
			/>,
		);

		const tempDisplay = document.querySelector(".temp-display");
		fireEvent.click(tempDisplay!);

		expect(mockHandleGarageMoreClick).toHaveBeenCalled();
	});

	describe("static methods", () => {
		test("findGarageDevice returns garage opener device", () => {
			const device = GarageButton.findGarageDevice(mockRoomClosed);
			expect(device!.name).toBe("Garage Opener");
		});

		test("findGarageDevice returns undefined for room without garage device", () => {
			const roomWithoutGarage = {
				devices: [{ name: "Light", status: "1" }],
			} as any;
			const device = GarageButton.findGarageDevice(roomWithoutGarage);
			expect(device).toBeUndefined();
		});

		test("findGarageDevice returns null for null room", () => {
			const device = GarageButton.findGarageDevice(null as any);
			expect(device).toBeNull();
		});

		test("findGarageTemperature returns device temperature", () => {
			const temp = GarageButton.findGarageTemperature(mockRoomClosed);
			expect(temp).toBe(72);
		});

		test("findGarageTemperature returns 100 for room without garage device", () => {
			const roomWithoutGarage = {
				devices: [{ name: "Light", status: "1" }],
			} as any;
			const temp = GarageButton.findGarageTemperature(roomWithoutGarage);
			expect(temp).toBe(100);
		});

		test("isDoorOpen returns true when status is 'true'", () => {
			const isOpen = GarageButton.isDoorOpen(mockRoomOpen);
			expect(isOpen).toBe(true);
		});

		test("isDoorOpen returns false when status is 'false'", () => {
			const isOpen = GarageButton.isDoorOpen(mockRoomClosed);
			expect(isOpen).toBe(false);
		});

		test("getLastOpen returns formatted time string", () => {
			const lastOpen = GarageButton.getLastOpen(mockRoomClosed);
			expect(lastOpen).toBeTruthy();
			expect(typeof lastOpen).toBe("string");
		});

		test("getLastOpen returns empty string for undefined historicOpenTime", () => {
			const roomWithoutHistory = {
				devices: [{ name: "Garage Opener", status: "false" }],
			} as any;
			const lastOpen = GarageButton.getLastOpen(roomWithoutHistory);
			expect(lastOpen).toBe("");
		});

		test("getAutoClose formats time correctly", () => {
			const autoClose = GarageButton.getAutoClose(mockRoomClosed);
			expect(autoClose).toBe("5:00");
		});

		test("getAutoClose formats hours and minutes correctly", () => {
			const autoClose = GarageButton.getAutoClose(mockRoomOpen);
			expect(autoClose).toBe("1:05:00");
		});

		test("getAutoClose returns empty string for undefined autoClose", () => {
			const roomWithoutAutoClose = {
				devices: [{ name: "Garage Opener", status: "false" }],
			} as any;
			const autoClose = GarageButton.getAutoClose(roomWithoutAutoClose);
			expect(autoClose).toBe("");
		});
	});

	test("displays auto close time", () => {
		renderWithProviders(
			<GarageButton
				room={mockRoomClosed}
				handleGarageClick={mockHandleGarageClick}
				handleGarageMoreClick={mockHandleGarageMoreClick}
			/>,
		);

		expect(screen.getByText("5:00")).toBeInTheDocument();
	});

	test("applies correct CSS classes", () => {
		renderWithProviders(
			<GarageButton
				room={mockRoomClosed}
				handleGarageClick={mockHandleGarageClick}
				handleGarageMoreClick={mockHandleGarageMoreClick}
			/>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("m-1");
		expect(button).toHaveClass("position-relative");
		expect(button).toHaveClass("d-flex");
		expect(button).toHaveClass("justify-content-center");
	});
});
