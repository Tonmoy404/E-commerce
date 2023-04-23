const { createProfile, updateProfile, findProfile, getProfile, deleteProfile, getprofiles } = require('./profile.controller');
const { updateProfileSchema, createProfileSchema } = require('./profile.schema');
const AuthStrategy = require('../Users/user.authentication.middleware');
const validate = require('../core/middlewares/validate');

module.exports = app => {
    app.route('/profiles')
        .post(AuthStrategy, validate(createProfileSchema), createProfile)
        .get(AuthStrategy, getprofiles)

    app.route('/profile/:id')
        .get(AuthStrategy, getProfile)
        .delete(AuthStrategy, deleteProfile)
        .patch(AuthStrategy, validate(updateProfileSchema), updateProfile);
}