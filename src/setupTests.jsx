import "@testing-library/jest-dom";

// Wrap native Request to support relative URLs in jsdom/node environment
const OriginalRequest = globalThis.Request;
globalThis.Request = class extends OriginalRequest {
	constructor(input, init) {
		if (typeof input === "string" && input.startsWith("/")) {
			super(`http://localhost${input}`, init);
		} else {
			super(input, init);
		}
	}
};

// Default fetch mock to prevent unhandled rejections from relative URLs
// Tests that need specific fetch behavior should use mockFetch() from test-utils
globalThis.fetch = vi.fn(() =>
	Promise.resolve({
		ok: true,
		json: () => Promise.resolve({}),
	}),
);

beforeEach(() => {
	globalThis.fetch.mockClear();
});
