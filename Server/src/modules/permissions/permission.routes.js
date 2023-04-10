const { createPermission, updatePermission, deletePermission, getPermission} = require('./permission.controller');
const AuthStrategy = require('../Users/user.authentication.middleware');
const validate = require('../core/middlewares/validate');
const { createPermissionSchema, updatePermissionSchema } = require('./permission.schema');

module.exports = app => {
    app.route('/permission')
        .post(AuthStrategy, validate(createPermissionSchema), createPermission);

    app.route('/permission/:id')
        .get(AuthStrategy, getPermission)
        .patch(AuthStrategy, validate(updatePermissionSchema), updatePermission)
        .delete(AuthStrategy, deletePermission);
    
}