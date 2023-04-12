const { createProfile, updateProfile, findProfile, getProfile, deleteProfile } = require('./profile.controller');
const { updateProfileSchema, createProfileSchema } = require('./profile.schema');
const AuthStrategy = require('../Users/user.authentication.middleware');
const validate = require('../../modules/core/middlewares/validate');

module.exports = app => {
    app.route('/profiles')
        .post(AuthStrategy, validate(createProfileSchema), createProfile)

    app.route('/profile/:id')
        .get(AuthStrategy, getProfile)
        .delete(AuthStrategy, deleteProfile)
        .patch(AuthStrategy, validate(updateProfileSchema), updateProfile);
}