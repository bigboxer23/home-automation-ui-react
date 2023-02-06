module.exports = {
	staticFileGlobs: [
		"build/*.html",
		"build/manifest.json",
		"build/static/**/!(*map*)",
	],
	/*staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],*/
	swFilePath: "./build/service-worker.js",
	stripPrefix: "build/",
	runtimeCaching: [
		{
			urlPattern: /FrontDoor/,
			handler: "networkOnly",
		},
	],
};
