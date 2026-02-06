import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils";
import MeuralButton, {
	getButtonStyling,
} from "../../../components/meural/MeuralButton";

// Mock the connected-react-router push action
vi.mock("../../../utils/navigation", async () => ({
	...(await vi.importActual("../../../utils/navigation")),
	push: vi.fn(),
}));

describe("MeuralButton", () => {
	const mockRoomOn = {
		name: "Meural",
		devices: [
			{
				name: "Meural",
				status: "1",
				level: "1.0",
			},
		],
	};

	const mockRoomOff = {
		name: "Meural",
		devices: [
			{
				name: "Meural",
				status: "0",
				level: "0.0",
			},
		],
	};

	const mockRoomNoDevice = {
		name: "Meural",
		devices: [],
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders meural button with room name", () => {
		renderWithProviders(<MeuralButton room={mockRoomOn} />);

		expect(screen.getByText("Meural")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("displays frame icon when meural is on", () => {
		renderWithProviders(<MeuralButton room={mockRoomOn} />);

		const icon = document.querySelector(".mdi-image-frame");
		expect(icon).toBeInTheDocument();
	});

	test("displays filter-frames icon when meural is off", () => {
		renderWithProviders(<MeuralButton room={mockRoomOff} />);

		const icon = document.querySelector(".mdi-image-filter-frames");
		expect(icon).toBeInTheDocument();
	});

	test("handles room without meural device", () => {
		renderWithProviders(<MeuralButton room={mockRoomNoDevice} />);

		expect(screen.getByText("Meural")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-image-filter-frames");
		expect(icon).toBeInTheDocument(); // Should default to off state
	});

	test("applies correct CSS classes", () => {
		renderWithProviders(<MeuralButton room={mockRoomOn} />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("m-1");
		expect(button).toHaveClass("position-relative");
		expect(button).toHaveClass("d-flex");
		expect(button).toHaveClass("justify-content-center");
		expect(button).toHaveClass("house-button");
	});

	test("button is clickable", () => {
		renderWithProviders(<MeuralButton room={mockRoomOn} />);

		const button = screen.getByRole("button");
		expect(button).not.toBeDisabled();
		expect(button).toBeInTheDocument();
	});

	test("handles null room gracefully", () => {
		renderWithProviders(<MeuralButton room={null} />);

		expect(screen.getByText("Meural")).toBeInTheDocument();
		const icon = document.querySelector(".mdi-image-filter-frames");
		expect(icon).toBeInTheDocument(); // Should default to off state
	});

	test("renders with large button size", () => {
		renderWithProviders(<MeuralButton room={mockRoomOn} />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("btn-lg");
	});
});

describe("getButtonStyling utility function", () => {
	test("returns frame styling when device is on", () => {
		const device = {
			name: "Meural",
			level: "1.0",
		};

		const result = getButtonStyling(device);
		expect(result).toBe("mdi mdi-image-frame");
	});

	test("returns filter-frames styling when device is off", () => {
		const device = {
			name: "Meural",
			level: "0.0",
		};

		const result = getButtonStyling(device);
		expect(result).toBe("mdi mdi-image-filter-frames");
	});

	test("returns filter-frames styling for undefined device", () => {
		const result = getButtonStyling(undefined);
		expect(result).toBe("mdi mdi-image-filter-frames");
	});

	test("returns filter-frames styling for null device", () => {
		const result = getButtonStyling(null);
		expect(result).toBe("mdi mdi-image-filter-frames");
	});

	test("returns filter-frames styling for device with different level", () => {
		const device = {
			name: "Meural",
			level: "0.5",
		};

		const result = getButtonStyling(device);
		expect(result).toBe("mdi mdi-image-filter-frames");
	});

	test("returns filter-frames styling for device without level", () => {
		const device = {
			name: "Meural",
		};

		const result = getButtonStyling(device);
		expect(result).toBe("mdi mdi-image-filter-frames");
	});
});
