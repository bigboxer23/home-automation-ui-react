// Mock navigation utilities for Vitest
export const push = vi.fn(() => ({
	type: "@@router/NAVIGATE" as const,
	payload: {},
}));
