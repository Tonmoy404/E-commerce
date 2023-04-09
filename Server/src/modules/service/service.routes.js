const AuthStrategy = require('../Users/user.authentication.middleware');
const { getServiceById, getServices } = require('./service.controller');

module.exports = (app)=>{
    app.route('/services')
        .get(AuthStrategy, getServices)
    app.route('/services/:id')
        .get(AuthStrategy, getServiceById)
}