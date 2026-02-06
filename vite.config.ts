import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

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
		},
		build: {
			outDir: "build",
		},
		test: {
			globals: true,
			environment: "jsdom",
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
