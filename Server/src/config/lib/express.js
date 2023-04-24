const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("../index");
const path = require("path");
const swagger = require("./swagger");
const swaggerUi = require("swagger-ui-express");

module.exports = () => {
	const app = express();
	app.use(express.json());
	app.use(cookieParser(process.env.COOKIE_SECRET));

	app.set("port", process.env.PORT);

	const globalConfig = config.getGlobalConfig();

	//  console.log("------...", globalConfig.routes);

	globalConfig.routes.forEach(function (routepath) {
		require(path.resolve(routepath))(app);
	});

	globalConfig.strategies.forEach(function (strategyPath) {
		require(path.resolve(strategyPath))();
	});

	app.use(
		"/api-docs",
		swaggerUi.serve,
		swaggerUi.setup(swagger.specs, swagger.uiOptions)
	);

	return app;
};
