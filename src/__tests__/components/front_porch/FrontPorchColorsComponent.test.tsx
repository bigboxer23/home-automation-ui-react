import React from "react";
import { screen } from "@testing-library/react";
import FrontPorchColorsComponent from "../../../components/front_porch/FrontPorchColorsComponent";
import { renderWithProviders } from "../../../test-utils";

// Mock the child components
vi.mock("../../../components/front_porch/FrontPorchColorButton", () => ({
	default: function MockFrontPorchColorButton(props: any) {
		return (
			<div data-testid="front-porch-color-button">{props.device.name}</div>
		);
	},
}));

vi.mock("../../../components/front_porch/FrontPorchHueSceneButton", () => ({
	default: function MockFrontPorchHueSceneButton(props: any) {
		return (
			<div data-testid="front-porch-hue-scene-button">{props.device.name}</div>
		);
	},
}));

describe("FrontPorchColorsComponent", () => {
	const mockRooms = [
		{
			id: "fp-colors",
			name: "Front Porch Colors",
			devices: [
				{ id: "color1", name: "Red Scene" },
				{ id: "color2", name: "Blue Scene" },
				{
					id: "FrontPorchHueScene",
					name: "Hue Scene Controller",
					level: "hue1",
				},
			],
		},
		{
			id: "fp",
			name: "Front Porch",
			devices: [
				{ id: "hue1", name: "Normal", category: "hc", level: "OFF" },
				{ id: "hue2", name: "Colorful", category: "hc", level: "OFF" },
				{ id: "other", name: "Non-Hue Device", category: "light" },
			],
		},
	];

	const mockProps = {
		rooms: mockRooms,
		handleClick: vi.fn(),
		handleHueSceneClick: vi.fn(),
	} as any;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders Front Porch Scenes label", () => {
		renderWithProviders(<FrontPorchColorsComponent {...mockProps} />);

		expect(screen.getByText("Front Porch Scenes")).toBeInTheDocument();
	});

	test("renders FrontPorchColorButton for OpenHAB scenes", () => {
		renderWithProviders(<FrontPorchColorsComponent {...mockProps} />);

		expect(screen.getByText("Red Scene")).toBeInTheDocument();
		expect(screen.getByText("Blue Scene")).toBeInTheDocument();
		expect(screen.getAllByTestId("front-porch-color-button")).toHaveLength(2);
	});

	test("excludes FrontPorchHueScene device from OpenHAB scenes", () => {
		renderWithProviders(<FrontPorchColorsComponent {...mockProps} />);

		expect(screen.queryByText("Hue Scene Controller")).not.toBeInTheDocument();
	});

	test("renders FrontPorchHueSceneButton for hue category devices", () => {
		renderWithProviders(<FrontPorchColorsComponent {...mockProps} />);

		expect(screen.getByText("Normal")).toBeInTheDocument();
		expect(screen.getByText("Colorful")).toBeInTheDocument();
		expect(screen.getAllByTestId("front-porch-hue-scene-button")).toHaveLength(
			2,
		);
	});

	test("filters out non-hue category devices from hue scenes", () => {
		renderWithProviders(<FrontPorchColorsComponent {...mockProps} />);

		expect(screen.queryByText("Non-Hue Device")).not.toBeInTheDocument();
	});

	test("sets level to ON for currently active hue scene", () => {
		// Create test scenario where hue1 is the active scene
		const roomsWithActiveHue = [
			{
				name: "Front Porch Colors",
				devices: [
					{ id: "FrontPorchHueScene", name: "Controller", level: "hue1" },
				],
			},
			{
				name: "Front Porch",
				devices: [
					{ id: "hue1", name: "Normal", category: "hc", level: "OFF" },
					{ id: "hue2", name: "Colorful", category: "hc", level: "OFF" },
				],
			},
		];

		const propsWithActive = {
			...mockProps,
			rooms: roomsWithActiveHue,
		};

		renderWithProviders(<FrontPorchColorsComponent {...propsWithActive} />);

		// The component should render both hue devices
		expect(screen.getByText("Normal")).toBeInTheDocument();
		expect(screen.getByText("Colorful")).toBeInTheDocument();
	});

	test("has correct CSS classes", () => {
		const { container } = renderWithProviders(
			<FrontPorchColorsComponent {...mockProps} />,
		);

		const mainContainer = container.querySelector(".front-porch-color");
		expect(mainContainer).toHaveClass(
			"p-2",
			"w-100",
			"h-100",
			"d-flex",
			"flex-wrap",
			"justify-content-center",
			"align-content-start",
		);

		const label = container.querySelector(".scenes-label");
		expect(label).toHaveClass("ms-3", "mb-3", "w-100");
	});
});
