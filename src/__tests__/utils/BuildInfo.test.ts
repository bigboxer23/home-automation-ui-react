import { formatBuildDetail, getBuildInfo } from "../../utils/BuildInfo";

describe("BuildInfo", () => {
	describe("getBuildInfo", () => {
		test("falls back when the Vite build globals are absent", () => {
			// Vitest does not apply vite.config.ts `define`, so nothing is injected.
			expect(getBuildInfo()).toEqual({
				version: "dev",
				sha: "local",
				time: undefined,
			});
		});
	});

	describe("formatBuildDetail", () => {
		test("includes version, sha and UTC timestamp", () => {
			expect(
				formatBuildDetail({
					version: "v2026.09.03.2",
					sha: "5a62f0c",
					time: "2026-09-03T18:14:00.000Z",
				}),
			).toBe("Build v2026.09.03.2 (5a62f0c) — Sep 3, 2026, 6:14 PM UTC");
		});

		test("renders the timestamp in UTC regardless of local zone", () => {
			expect(
				formatBuildDetail({
					version: "v2026.01.01",
					sha: "abc1234",
					time: "2026-01-01T00:30:00.000Z",
				}),
			).toBe("Build v2026.01.01 (abc1234) — Jan 1, 2026, 12:30 AM UTC");
		});

		test("omits the timestamp when it is missing", () => {
			expect(
				formatBuildDetail({ version: "dev", sha: "local", time: undefined }),
			).toBe("Build dev (local)");
		});

		test("omits the timestamp when it is unparseable", () => {
			expect(
				formatBuildDetail({ version: "dev", sha: "local", time: "not-a-date" }),
			).toBe("Build dev (local)");
		});
	});
});
