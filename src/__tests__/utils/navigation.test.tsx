import {
	setNavigationInstance,
	push,
	getNavigationInstance,
} from "../../utils/navigation";

describe("navigation utils", () => {
	const mockNavigate = vi.fn();
	const mockDispatch = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		// Reset the navigation instance
		setNavigationInstance(null as any);
	});

	describe("setNavigationInstance", () => {
		test("sets the navigation instance", () => {
			setNavigationInstance(mockNavigate);
			expect(getNavigationInstance()).toBe(mockNavigate);
		});

		test("can update the navigation instance", () => {
			const firstNavigate = vi.fn();
			const secondNavigate = vi.fn();

			setNavigationInstance(firstNavigate);
			expect(getNavigationInstance()).toBe(firstNavigate);

			setNavigationInstance(secondNavigate);
			expect(getNavigationInstance()).toBe(secondNavigate);
		});

		test("can set to null", () => {
			setNavigationInstance(mockNavigate);
			setNavigationInstance(null as any);
			expect(getNavigationInstance()).toBe(null);
		});
	});

	describe("getNavigationInstance", () => {
		test("returns null when no instance is set", () => {
			expect(getNavigationInstance()).toBe(null);
		});

		test("returns the set navigation instance", () => {
			setNavigationInstance(mockNavigate);
			expect(getNavigationInstance()).toBe(mockNavigate);
		});
	});

	describe("push", () => {
		test("returns a thunk function", () => {
			const pushAction = push("/test-path");
			expect(typeof pushAction).toBe("function");
		});

		test("calls navigate when navigation instance is available", () => {
			setNavigationInstance(mockNavigate);
			const pushAction = push("/test-path");

			const result = (pushAction as any)(mockDispatch);

			expect(mockNavigate).toHaveBeenCalledWith("/test-path");
			expect(result).toEqual({
				type: "@@router/NAVIGATE",
				payload: { path: "/test-path" },
			});
		});

		test("falls back to window.location when no navigation instance", () => {
			const originalLocation = window.location;
			delete (window as any).location;
			(window as any).location = { href: "" };

			const pushAction = push("/test-path");
			(pushAction as any)(mockDispatch);

			expect(window.location.href).toBe("/test-path");

			// Restore original location
			(window as any).location = originalLocation;
		});

		test("returns correct action object", () => {
			setNavigationInstance(mockNavigate);
			const pushAction = push("/some/path");

			const result = (pushAction as any)(mockDispatch);

			expect(result).toEqual({
				type: "@@router/NAVIGATE",
				payload: { path: "/some/path" },
			});
		});

		test("handles different path formats", () => {
			setNavigationInstance(mockNavigate);

			// Test absolute path
			let pushAction = push("/absolute/path");
			(pushAction as any)(mockDispatch);
			expect(mockNavigate).toHaveBeenCalledWith("/absolute/path");

			// Test relative path
			pushAction = push("relative/path");
			(pushAction as any)(mockDispatch);
			expect(mockNavigate).toHaveBeenCalledWith("relative/path");

			// Test path with query params
			pushAction = push("/path?param=value");
			(pushAction as any)(mockDispatch);
			expect(mockNavigate).toHaveBeenCalledWith("/path?param=value");

			// Test path with hash
			pushAction = push("/path#section");
			(pushAction as any)(mockDispatch);
			expect(mockNavigate).toHaveBeenCalledWith("/path#section");
		});

		test("works with Redux dispatch", () => {
			setNavigationInstance(mockNavigate);

			// Simulate how Redux would call the thunk
			const pushAction = push("/test-path");
			const result = (pushAction as any)(mockDispatch);

			expect(mockDispatch).toHaveBeenCalledTimes(0); // Our thunk doesn't dispatch anything
			expect(result.type).toBe("@@router/NAVIGATE");
		});
	});

	describe("integration", () => {
		test("complete navigation flow", () => {
			// 1. Set up navigation instance
			setNavigationInstance(mockNavigate);

			// 2. Verify it's set
			expect(getNavigationInstance()).toBe(mockNavigate);

			// 3. Use push to navigate
			const pushAction = push("/integration-test");
			const result = (pushAction as any)(mockDispatch);

			// 4. Verify navigation was called
			expect(mockNavigate).toHaveBeenCalledWith("/integration-test");

			// 5. Verify action was returned
			expect(result.payload.path).toBe("/integration-test");
		});

		test("handles navigation instance changes", () => {
			const firstNavigate = vi.fn();
			const secondNavigate = vi.fn();

			// Start with first navigate
			setNavigationInstance(firstNavigate);
			let pushAction = push("/path1");
			(pushAction as any)(mockDispatch);
			expect(firstNavigate).toHaveBeenCalledWith("/path1");
			expect(secondNavigate).not.toHaveBeenCalled();

			// Switch to second navigate
			setNavigationInstance(secondNavigate);
			pushAction = push("/path2");
			(pushAction as any)(mockDispatch);
			expect(secondNavigate).toHaveBeenCalledWith("/path2");
			expect(firstNavigate).toHaveBeenCalledTimes(1); // Still only called once
		});
	});
});
