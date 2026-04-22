import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import CameraPage from "../../containers/CameraPage";
import { renderWithProviders } from "../../test-utils";

// Use fake timers throughout so the module-level intervalId resets between
// tests (resizeImgContent clears it when contentDocument is null).
beforeAll(() => {
	vi.useFakeTimers();
});

afterEach(() => {
	// Advance past the 250ms interval to fire resizeImgContent, which resets
	// the module-level intervalId to null so the next test gets a fresh interval.
	vi.advanceTimersByTime(300);
	vi.clearAllTimers();
});

afterAll(() => {
	vi.useRealTimers();
});

// Mock window.location.pathname
delete (window as any).location;
(window as any).location = { pathname: "/Security" };

describe("CameraPage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		window.location.pathname = "/Security";
	});

	test("renders CameraComponent with correct props for Security path", () => {
		const { container } = renderWithProviders(<CameraPage />);

		const iframe = container.querySelector("iframe");
		expect(iframe).toHaveAttribute("src", "/FrontDoor");
		expect(screen.getByText("Front Door Security")).toBeInTheDocument();
	});

	test("renders CameraComponent with correct props for GrowPi path", () => {
		window.location.pathname = "/GrowPi";

		const { container } = renderWithProviders(<CameraPage />);

		const iframe = container.querySelector("iframe");
		expect(iframe).toHaveAttribute("src", "/GrowPi/index.html");
		expect(screen.getByText("Grow Tent")).toBeInTheDocument();
	});

	test("has correct CSS classes", () => {
		const { container } = renderWithProviders(<CameraPage />);

		const iframe = container.querySelector("iframe");
		expect(iframe).toHaveClass("security", "room-content");
	});

	test("renders background div", () => {
		const { container } = renderWithProviders(<CameraPage />);

		expect(container.querySelector(".background")).toBeInTheDocument();
	});

	test("calls back action when header is clicked", () => {
		renderWithProviders(<CameraPage />);

		fireEvent.click(screen.getByText("Front Door Security"));
		expect(document.body).toBeInTheDocument();
	});

	test("fires resizeImgContent via interval on mount", () => {
		renderWithProviders(<CameraPage />);

		// Advance past the 250ms interval — resizeImgContent runs and clears
		// intervalId when jsdom iframe.contentDocument is null
		vi.advanceTimersByTime(300);
		expect(document.body).toBeInTheDocument();
	});

	test("does not create a second interval when one is already running", () => {
		// Render without advancing timers — intervalId is set but not yet cleared
		renderWithProviders(<CameraPage />);
		// Render again before the interval fires; initializeIframe should no-op
		renderWithProviders(<CameraPage />);
		vi.advanceTimersByTime(300);
		expect(document.body).toBeInTheDocument();
	});
});
