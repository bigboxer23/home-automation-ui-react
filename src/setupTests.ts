import "@testing-library/jest-dom";

// Wrap native Request to support relative URLs in jsdom/node environment
const OriginalRequest = globalThis.Request;
globalThis.Request = class extends OriginalRequest {
	constructor(input: RequestInfo | URL, init?: RequestInit) {
		if (typeof input === "string" && input.startsWith("/")) {
			super(`http://localhost${input}`, init);
		} else {
			super(input, init);
		}
	}
} as typeof Request;

// Default fetch mock to prevent unhandled rejections from relative URLs
// Tests that need specific fetch behavior should use mockFetch() from test-utils
globalThis.fetch = vi.fn(() =>
	Promise.resolve({
		ok: true,
		json: () => Promise.resolve({}),
	}),
) as unknown as typeof fetch;

beforeEach(() => {
	(globalThis.fetch as ReturnType<typeof vi.fn>).mockClear();
});
