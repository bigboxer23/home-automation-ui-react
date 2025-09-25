import React from "react";
import { screen } from "@testing-library/react";
import ErrorPage from "../../containers/ErrorPage";
import { renderWithProviders } from "../../test-utils";

describe("ErrorPage", () => {
	test("renders error message", () => {
		renderWithProviders(<ErrorPage />);

		expect(screen.getByText("Shouldn't get here")).toBeInTheDocument();
	});

	test("is connected to Redux store", () => {
		const { container } = renderWithProviders(<ErrorPage />);

		// Should render without throwing errors when connected to store
		expect(container.firstChild).toBeTruthy();
	});
});
