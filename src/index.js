const express = require("express");
const { rateLimit } = require("express-rate-limit");
const { ServerConfig, Logger } = require("./config");
const apiRoutes = require("./routes");
const { createProxyMiddleware } = require("http-proxy-middleware");

const limiter = rateLimit({
	windowMs: 3 * 60 * 1000, // 15 minutes
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});

const app = express();
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	"/flightsService",
	createProxyMiddleware({
		target: ServerConfig.FLIGHT_SERVICE,
		changeOrigin: true,
		pathRewrite: { "^/flightsService": "/" },
	})
);
app.use(
	"/bookingsService",
	createProxyMiddleware({
		target: ServerConfig.BOOKING_SERVICE,
		changeOrigin: true,
		pathRewrite: { "^/bookingsService": "/" },
	})
);

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
	console.log(`Server is running on port ${ServerConfig.PORT}`);
	Logger.info("Server started");
});
