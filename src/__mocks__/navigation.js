// Mock navigation utilities for Jest
export const push = jest.fn(() => ({
	type: "@@router/NAVIGATE",
	payload: {},
}));
