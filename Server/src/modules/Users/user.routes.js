const { createUser, logIn, updateUser } = require('./user.controller');
const validate = require('../core/middlewares/validate');
const { createUserSchema, updateUserSchema } = require('./user.schema');
const AuthStrategy = require('./user.authentication.middleware');

module.exports = (app)=>{
    app.route('/users')
        .post(validate(createUserSchema), createUser)
        .patch(AuthStrategy, validate(updateUserSchema), updateUser);

    app.route('/users/login')
        .post(logIn);
}