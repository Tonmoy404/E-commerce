const { createUser, logIn, updateUser, getUser, getUsers, logOut } = require('./user.controller');
const validate = require('../core/middlewares/validate');
const { createUserSchema, updateUserSchema } = require('./user.schema');
const AuthStrategy = require('./user.authentication.middleware');

module.exports = (app)=>{
    app.route('/user')
        .get(AuthStrategy, getUsers)
        .post(validate(createUserSchema), createUser)
        .patch(AuthStrategy, validate(updateUserSchema), updateUser);

    app.route('/user/login')
        .post(logIn);

    app.route('/user/logout')
        .post(AuthStrategy, logOut);
}