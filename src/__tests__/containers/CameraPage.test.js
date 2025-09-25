import React from "react";
import { screen } from "@testing-library/react";
import CameraPage from "../../containers/CameraPage";
import { renderWithProviders } from "../../test-utils";

// Mock window.location.pathname
delete window.location;
window.location = { pathname: "/Security" };

describe("CameraPage", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// Reset to Security path for each test
		window.location.pathname = "/Security";
	});

	test("renders CameraComponent with correct props for Security path", () => {
		const { container } = renderWithProviders(<CameraPage />);

		// Should render iframe with front door source
		const iframe = container.querySelector("iframe");
		expect(iframe).toHaveAttribute("src", "/FrontDoor");

		// Should display Security camera name
		expect(screen.getByText("Front Door Security")).toBeInTheDocument();
	});

	test("renders CameraComponent with correct props for GrowPi path", () => {
		window.location.pathname = "/GrowPi";

		const { container } = renderWithProviders(<CameraPage />);

		// Should render iframe with GrowPi source
		const iframe = container.querySelector("iframe");
		expect(iframe).toHaveAttribute("src", "/GrowPi/index.html");

		// Should display GrowPi camera name
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
});
