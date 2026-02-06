import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import FrontPorchHueSceneButton from "../../../components/front_porch/FrontPorchHueSceneButton";
import { renderWithProviders } from "../../../test-utils";

describe("FrontPorchHueSceneButton", () => {
	const mockProps = {
		device: { id: "hue1", name: "Colorful", level: "OFF" },
		handleClick: vi.fn(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders device name", () => {
		renderWithProviders(<FrontPorchHueSceneButton {...mockProps} />);

		expect(screen.getByText("Colorful")).toBeInTheDocument();
	});

	test("displays default icon for non-Normal scenes", () => {
		const { container } = renderWithProviders(
			<FrontPorchHueSceneButton {...mockProps} />,
		);

		const icon = container.querySelector(".mdi-lightbulb-group-outline");
		expect(icon).toBeInTheDocument();
	});

	test("displays off icon for Normal scene", () => {
		const propsWithNormal = {
			...mockProps,
			device: { id: "hue1", name: "Normal", level: "OFF" },
		};

		const { container } = renderWithProviders(
			<FrontPorchHueSceneButton {...propsWithNormal} />,
		);

		const icon = container.querySelector(".mdi-lightbulb-group-off-outline");
		expect(icon).toBeInTheDocument();
	});

	test("has default button style when level is OFF", () => {
		renderWithProviders(<FrontPorchHueSceneButton {...mockProps} />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("btn-default");
	});

	test("has success button style when level is ON", () => {
		const propsWithOn = {
			...mockProps,
			device: { id: "hue1", name: "Colorful", level: "ON" },
		};

		renderWithProviders(<FrontPorchHueSceneButton {...propsWithOn} />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("btn-success");
	});

	test("calls handleClick with correct parameters", () => {
		renderWithProviders(<FrontPorchHueSceneButton {...mockProps} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(mockProps.handleClick).toHaveBeenCalledWith(
			"hue1",
			"FrontPorchHueScene",
		);
	});

	test("has correct CSS classes", () => {
		renderWithProviders(<FrontPorchHueSceneButton {...mockProps} />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass(
			"mb-3",
			"m-1",
			"position-relative",
			"d-flex",
			"justify-content-center",
			"btn-lg",
		);
	});

	test("renders button text in absolute positioned div", () => {
		const { container } = renderWithProviders(
			<FrontPorchHueSceneButton {...mockProps} />,
		);

		const textDiv = container.querySelector(".position-absolute.bottom");
		expect(textDiv).toHaveClass("w-100", "m-2", "ps-2", "pe-2");
		expect(textDiv).toHaveTextContent("Colorful");
	});

	test("handles different device names for icon selection", () => {
		const testCases = [
			{ name: "Normal", expectedClass: "mdi-lightbulb-group-off-outline" },
			{ name: "Bright", expectedClass: "mdi-lightbulb-group-outline" },
			{ name: "Dim", expectedClass: "mdi-lightbulb-group-outline" },
			{ name: "Party", expectedClass: "mdi-lightbulb-group-outline" },
		];

		testCases.forEach(({ name, expectedClass }) => {
			const props = {
				...mockProps,
				device: { id: "test", name, level: "OFF" },
			};

			const { container, unmount } = renderWithProviders(
				<FrontPorchHueSceneButton {...props} />,
			);

			const icon = container.querySelector(`.${expectedClass}`);
			expect(icon).toBeInTheDocument();

			unmount();
		});
	});
});
