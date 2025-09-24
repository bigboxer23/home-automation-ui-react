import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils";
import FrontPorchColorButton from "../../../components/front_porch/FrontPorchColorButton";

describe("FrontPorchColorButton", () => {
	const mockHandleClick = jest.fn();

	const mockDevicePride = {
		id: "pride-light",
		name: "Pride",
		status: "1",
		level: "100",
		category: "2", // Light category
	};

	const mockDeviceChristmas = {
		id: "christmas-light",
		name: "Christmas",
		status: "0",
		level: "0",
	};

	const mockDeviceValentines = {
		id: "valentines-light",
		name: "Valentines",
		status: "1",
		level: "75",
	};

	const mockDeviceHalloween = {
		id: "halloween-light",
		name: "Halloween",
		status: "0",
		level: "0",
	};

	const mockDeviceThanksgiving = {
		id: "thanksgiving-light",
		name: "Thanksgiving",
		status: "1",
		level: "50",
	};

	const mockDeviceRetro = {
		id: "retro-light",
		name: "Retro",
		status: "0",
		level: "0",
	};

	const mockDeviceEaster = {
		id: "easter-light",
		name: "Easter",
		status: "1",
		level: "80",
	};

	const mockDeviceFourthOfJuly = {
		id: "july-light",
		name: "4th of July",
		status: "0",
		level: "0",
	};

	const mockDeviceNormal = {
		id: "normal-light",
		name: "Normal",
		status: "1",
		level: "100",
	};

	const mockDeviceUnknown = {
		id: "unknown-light",
		name: "Unknown Theme",
		status: "1",
		level: "60",
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders pride theme button", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDevicePride}
				handleClick={mockHandleClick}
			/>,
		);

		expect(screen.getByText("Pride")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();

		const icon = document.querySelector(".mdi-looks");
		expect(icon).toBeInTheDocument();
	});

	test("renders christmas theme button", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDeviceChristmas}
				handleClick={mockHandleClick}
			/>,
		);

		expect(screen.getByText("Christmas")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-forest");
		expect(icon).toBeInTheDocument();
	});

	test("renders valentines theme button", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDeviceValentines}
				handleClick={mockHandleClick}
			/>,
		);

		expect(screen.getByText("Valentines")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-heart-outline");
		expect(icon).toBeInTheDocument();
	});

	test("renders halloween theme button", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDeviceHalloween}
				handleClick={mockHandleClick}
			/>,
		);

		expect(screen.getByText("Halloween")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-halloween");
		expect(icon).toBeInTheDocument();
	});

	test("renders thanksgiving theme button", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDeviceThanksgiving}
				handleClick={mockHandleClick}
			/>,
		);

		expect(screen.getByText("Thanksgiving")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-turkey");
		expect(icon).toBeInTheDocument();
	});

	test("renders retro theme button", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDeviceRetro}
				handleClick={mockHandleClick}
			/>,
		);

		expect(screen.getByText("Retro")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-lamps");
		expect(icon).toBeInTheDocument();
	});

	test("renders easter theme button", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDeviceEaster}
				handleClick={mockHandleClick}
			/>,
		);

		expect(screen.getByText("Easter")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-rabbit-variant-outline");
		expect(icon).toBeInTheDocument();
	});

	test("renders 4th of july theme button", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDeviceFourthOfJuly}
				handleClick={mockHandleClick}
			/>,
		);

		expect(screen.getByText("4th of July")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-firework");
		expect(icon).toBeInTheDocument();
	});

	test("renders normal theme button", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDeviceNormal}
				handleClick={mockHandleClick}
			/>,
		);

		expect(screen.getByText("Normal")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-lightbulb-group-off-outline");
		expect(icon).toBeInTheDocument();
	});

	test("renders unknown theme with default icon", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDeviceUnknown}
				handleClick={mockHandleClick}
			/>,
		);

		expect(screen.getByText("Unknown Theme")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-lightbulb-group-outline");
		expect(icon).toBeInTheDocument();
	});

	test("applies success variant when device is on", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDevicePride}
				handleClick={mockHandleClick}
			/>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("btn-success");
	});

	test("applies default variant when device is off", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDeviceChristmas}
				handleClick={mockHandleClick}
			/>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("btn-default");
	});

	test("applies correct CSS classes", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDevicePride}
				handleClick={mockHandleClick}
			/>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("mb-3");
		expect(button).toHaveClass("m-1");
		expect(button).toHaveClass("position-relative");
		expect(button).toHaveClass("d-flex");
		expect(button).toHaveClass("justify-content-center");
		expect(button).toHaveClass("btn-lg");
	});

	test("calls handleClick with device id when clicked", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDevicePride}
				handleClick={mockHandleClick}
			/>,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(mockHandleClick).toHaveBeenCalledWith("pride-light");
	});

	test("renders within div container", () => {
		const { container } = renderWithProviders(
			<FrontPorchColorButton
				device={mockDevicePride}
				handleClick={mockHandleClick}
			/>,
		);

		const divContainer = container.querySelector("div");
		expect(divContainer).toBeInTheDocument();

		const button = divContainer.querySelector("button");
		expect(button).toBeInTheDocument();
	});

	test("displays device name in absolute positioned div", () => {
		renderWithProviders(
			<FrontPorchColorButton
				device={mockDevicePride}
				handleClick={mockHandleClick}
			/>,
		);

		const nameDiv = document.querySelector(".position-absolute.bottom");
		expect(nameDiv).toBeInTheDocument();
		expect(nameDiv).toHaveTextContent("Pride");
		expect(nameDiv).toHaveClass("w-100");
		expect(nameDiv).toHaveClass("m-2");
		expect(nameDiv).toHaveClass("ps-2");
		expect(nameDiv).toHaveClass("pe-2");
	});

	describe("icon styling edge cases", () => {
		test("handles device with null level as off", () => {
			const deviceNullLevel = {
				id: "null-level",
				name: "Pride",
				status: "1",
				level: null,
			};

			renderWithProviders(
				<FrontPorchColorButton
					device={deviceNullLevel}
					handleClick={mockHandleClick}
				/>,
			);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("btn-default");
		});

		test("handles device with zero level as off", () => {
			const deviceZeroLevel = {
				id: "zero-level",
				name: "Pride",
				status: "0",
				level: "0",
			};

			renderWithProviders(
				<FrontPorchColorButton
					device={deviceZeroLevel}
					handleClick={mockHandleClick}
				/>,
			);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("btn-default");
		});

		test("handles device with non-zero level as on", () => {
			const deviceNonZeroLevel = {
				id: "non-zero-level",
				name: "Pride",
				status: "1",
				level: "1",
				category: "2", // Light category
			};

			renderWithProviders(
				<FrontPorchColorButton
					device={deviceNonZeroLevel}
					handleClick={mockHandleClick}
				/>,
			);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("btn-success");
		});
	});
});
