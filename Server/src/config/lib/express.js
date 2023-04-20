const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('../index');
const path = require('path');

module.exports = ()=>{
    const app = express();
    app.use(express.json());
    app.use(cookieParser(process.env.COOKIE_SECRET));

    app.set('port', process.env.PORT);

     const globalConfig = config.getGlobalConfig();

    //  console.log("------...", globalConfig.routes);

     globalConfig.routes.forEach(function (routepath) {
        require(path.resolve(routepath))(app);
     });

     globalConfig.strategies.forEach(function (strategyPath) {
        require(path.resolve(strategyPath))();
    });

    return app;
}