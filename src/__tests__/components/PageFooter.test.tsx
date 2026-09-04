import { render } from "@testing-library/react";
import PageFooter from "../../components/PageFooter";

describe("PageFooter", () => {
	test("renders the build version", () => {
		const { container } = render(<PageFooter />);

		// The __BUILD_* globals are only injected by Vite at build time, so tests
		// exercise the fallbacks.
		expect(container.textContent).toBe("dev");
		expect(container.querySelector(".page-footer")).toBeInTheDocument();
	});

	test("exposes build detail as a tooltip", () => {
		const { container } = render(<PageFooter />);

		expect(container.querySelector("span[title]")).toHaveAttribute(
			"title",
			"Build dev (local)",
		);
	});

	test("applies footer layout classes", () => {
		const { container } = render(<PageFooter />);

		expect(container.querySelector(".page-footer")).toHaveClass(
			"flex",
			"justify-center",
			"p-4",
			"mt-auto",
		);
		expect(container.querySelector(".opacity-70")).toHaveClass("text-white");
	});
});
