// __BUILD_* globals are injected by Vite at build time (see vite.config.ts).
// They are undefined under Vitest, hence the guards and "dev" fallbacks.

export interface BuildInfo {
	/** Date-based version shown to users, e.g. "v2026.09.03" or "v2026.09.03.2". */
	version: string;
	/** Short git SHA of the deployed commit. */
	sha: string;
	/** ISO 8601 build timestamp, or undefined outside a real build. */
	time: string | undefined;
}

export function getBuildInfo(): BuildInfo {
	return {
		version: typeof __BUILD_VERSION__ === "string" ? __BUILD_VERSION__ : "dev",
		sha: typeof __BUILD_SHA__ === "string" ? __BUILD_SHA__ : "local",
		time: typeof __BUILD_TIME__ === "string" ? __BUILD_TIME__ : undefined,
	};
}

/**
 * Support-facing detail for the footer tooltip, e.g.
 * "Build v2026.09.03.2 (5a62f0c) — Sep 3, 2026, 6:14 PM UTC".
 * Pinned to UTC so every viewer reports the same string.
 */
export function formatBuildDetail({ version, sha, time }: BuildInfo): string {
	const label = `Build ${version} (${sha})`;
	if (!time) {
		return label;
	}
	const date = new Date(time);
	if (Number.isNaN(date.getTime())) {
		return label;
	}
	const stamp = date.toLocaleString("en-US", {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "UTC",
	});
	return `${label} — ${stamp} UTC`;
}
