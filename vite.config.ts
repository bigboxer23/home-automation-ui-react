import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";

const gitSha = (): string => {
	try {
		return execSync("git rev-parse --short=7 HEAD").toString().trim();
	} catch {
		return "unknown";
	}
};

/**
 * How many commits landed on this UTC day, used to disambiguate builds made
 * from more than one commit on the same day.
 */
const commitsToday = (date: Date): number => {
	const midnight = new Date(
		Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
	).toISOString();
	try {
		const count = execSync(
			`git rev-list --count HEAD --since="${midnight}"`,
		).toString();
		return Math.max(Number.parseInt(count.trim(), 10) || 1, 1);
	} catch {
		return 1;
	}
};

/** Date-based version, e.g. "v2026.09.03" or "v2026.09.03.2" for a rebuild. */
const buildVersion = (date: Date): string => {
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const day = String(date.getUTCDate()).padStart(2, "0");
	const base = `v${date.getUTCFullYear()}.${month}.${day}`;
	const sequence = commitsToday(date);
	return sequence > 1 ? `${base}.${sequence}` : base;
};

const buildDate = new Date();

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const proxyTarget = env.VITE_PROXY_URL || "http://localhost:8080";

	return {
		plugins: [react()],
		server: {
			port: 3000,
			open: true,
			proxy: {
				"/SceneStatus": {
					target: proxyTarget,
					changeOrigin: true,
					secure: true,
				},
				"/S": {
					target: proxyTarget,
					changeOrigin: true,
					secure: true,
				},
				"/getToken": {
					target: proxyTarget,
					changeOrigin: true,
					secure: true,
				},
			},
		},
		define: {
			"process.env.NODE_ENV": JSON.stringify(mode),
			// Left out under Vitest so tests exercise the fallbacks in BuildInfo.
			...(mode === "test"
				? {}
				: {
						__BUILD_VERSION__: JSON.stringify(buildVersion(buildDate)),
						__BUILD_SHA__: JSON.stringify(gitSha()),
						__BUILD_TIME__: JSON.stringify(buildDate.toISOString()),
					}),
		},
		build: {
			outDir: "build",
		},
		test: {
			globals: true,
			environment: "jsdom",
			server: {
				deps: {
					inline: ["react-transition-group", /@mui\//],
				},
			},
			environmentOptions: {
				jsdom: {
					url: "http://localhost",
				},
			},
			setupFiles: "./src/setupTests.ts",
			css: true,
			coverage: {
				provider: "v8",
				include: ["src/**/*.{ts,tsx}"],
				exclude: [
					"src/index.tsx",
					"src/setupTests.ts",
					"src/test-utils.tsx",
					"src/__tests__/**",
				],
				thresholds: {
					branches: 3,
					functions: 5,
					lines: 12,
					statements: 12,
				},
			},
		},
	};
});
