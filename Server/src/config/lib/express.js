const express = require('express');
const cookieParser = require('cookie-parser');

module.exports = ()=>{
    const app = express();
    app.use(express.json());
    app.use(cookieParser(process.env.COOKIE_SECRET));

    app.set('port', process.env.PORT);

    return app;
}