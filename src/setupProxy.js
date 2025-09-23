const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	const proxyUrl = process.env.REACT_APP_PROXY_URL || "http://localhost:8080";

	app.use(
		["/SceneStatus", "/S", "/getToken"],
		createProxyMiddleware({
			target: proxyUrl,
			changeOrigin: true,
			secure: true,
		}),
	);
};
