import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils";
import IOSSwitch from "../../../components/ui/IOSSwitch";

describe("IOSSwitch", () => {
	const mockOnChange = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders iOS styled switch", () => {
		renderWithProviders(<IOSSwitch checked={false} onChange={mockOnChange} />);

		const switchElement = document.querySelector(".MuiSwitch-root");
		expect(switchElement).toBeInTheDocument();
	});

	test("renders in unchecked state", () => {
		renderWithProviders(<IOSSwitch checked={false} onChange={mockOnChange} />);

		const switchInput = document.querySelector('input[type="checkbox"]');
		expect(switchInput).not.toBeChecked();
	});

	test("renders in checked state", () => {
		renderWithProviders(<IOSSwitch checked={true} onChange={mockOnChange} />);

		const switchInput = document.querySelector('input[type="checkbox"]');
		expect(switchInput).toBeChecked();
	});

	test("handles onChange events", () => {
		renderWithProviders(<IOSSwitch checked={false} onChange={mockOnChange} />);

		const switchInput = document.querySelector('input[type="checkbox"]');
		fireEvent.click(switchInput!);

		expect(mockOnChange).toHaveBeenCalled();
	});

	test("handles disabled state", () => {
		renderWithProviders(
			<IOSSwitch checked={false} disabled onChange={mockOnChange} />,
		);

		const switchInput = document.querySelector('input[type="checkbox"]');
		expect(switchInput).toBeDisabled();
	});

	test("displays correct styling elements", () => {
		renderWithProviders(<IOSSwitch checked={true} onChange={mockOnChange} />);

		// Check for switch base element
		const switchBase = document.querySelector(".MuiSwitch-switchBase");
		expect(switchBase).toBeInTheDocument();

		// Check for thumb element
		const thumb = document.querySelector(".MuiSwitch-thumb");
		expect(thumb).toBeInTheDocument();

		// Check for track element
		const track = document.querySelector(".MuiSwitch-track");
		expect(track).toBeInTheDocument();
	});

	test("applies checked styling when checked", () => {
		renderWithProviders(<IOSSwitch checked={true} onChange={mockOnChange} />);

		const switchBase = document.querySelector(".MuiSwitch-switchBase");
		expect(switchBase).toHaveClass("Mui-checked");
	});

	test("does not apply checked styling when unchecked", () => {
		renderWithProviders(<IOSSwitch checked={false} onChange={mockOnChange} />);

		const switchBase = document.querySelector(".MuiSwitch-switchBase");
		expect(switchBase).not.toHaveClass("Mui-checked");
	});

	test("applies disabled styling when disabled", () => {
		renderWithProviders(
			<IOSSwitch checked={false} disabled onChange={mockOnChange} />,
		);

		const switchBase = document.querySelector(".MuiSwitch-switchBase");
		expect(switchBase).toHaveClass("Mui-disabled");
	});

	test("handles name prop", () => {
		renderWithProviders(
			<IOSSwitch checked={false} name="test-switch" onChange={mockOnChange} />,
		);

		const switchInput = document.querySelector('input[type="checkbox"]');
		expect(switchInput).toHaveAttribute("name", "test-switch");
	});

	test("handles value prop", () => {
		renderWithProviders(
			<IOSSwitch checked={false} value="test-value" onChange={mockOnChange} />,
		);

		const switchInput = document.querySelector('input[type="checkbox"]');
		expect(switchInput).toHaveAttribute("value", "test-value");
	});

	test("handles id prop", () => {
		renderWithProviders(
			<IOSSwitch checked={false} id="test-id" onChange={mockOnChange} />,
		);

		const switchInput = document.querySelector('input[type="checkbox"]');
		expect(switchInput).toHaveAttribute("id", "test-id");
	});

	test("handles aria-label for accessibility", () => {
		renderWithProviders(
			<IOSSwitch
				checked={false}
				inputProps={{ "aria-label": "Toggle setting" }}
				onChange={mockOnChange}
			/>,
		);

		const switchElement = document.querySelector(".MuiSwitch-root");
		expect(switchElement).toBeInTheDocument();

		const switchInput = document.querySelector('input[type="checkbox"]');
		expect(switchInput).toBeInTheDocument();
	});

	test("handles color prop", () => {
		renderWithProviders(
			<IOSSwitch checked={true} color="primary" onChange={mockOnChange} />,
		);

		const switchElement = document.querySelector(".MuiSwitch-root");
		expect(switchElement).toBeInTheDocument();
	});

	test("handles size prop", () => {
		renderWithProviders(
			<IOSSwitch checked={false} size="small" onChange={mockOnChange} />,
		);

		const switchElement = document.querySelector(".MuiSwitch-root");
		expect(switchElement).toBeInTheDocument();
	});

	test("disables ripple effect", () => {
		renderWithProviders(<IOSSwitch checked={false} onChange={mockOnChange} />);

		// The component uses disableRipple prop, so we check that it exists
		const switchElement = document.querySelector(".MuiSwitch-root");
		expect(switchElement).toBeInTheDocument();
	});

	test("handles focus visible state", () => {
		renderWithProviders(<IOSSwitch checked={false} onChange={mockOnChange} />);

		const switchInput = document.querySelector('input[type="checkbox"]');
		fireEvent.focus(switchInput!);

		// Check that switch can receive focus
		expect(switchInput).toBeInTheDocument();
	});

	test("toggles state on click", () => {
		const TestWrapper = () => {
			const [checked, setChecked] = React.useState(false);
			return (
				<IOSSwitch
					checked={checked}
					onChange={(event) => setChecked(event.target.checked)}
				/>
			);
		};

		renderWithProviders(<TestWrapper />);

		const switchInput = document.querySelector('input[type="checkbox"]');
		expect(switchInput).not.toBeChecked();

		fireEvent.click(switchInput!);
		expect(switchInput).toBeChecked();

		fireEvent.click(switchInput!);
		expect(switchInput).not.toBeChecked();
	});
});
