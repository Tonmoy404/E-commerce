const { string, object, array, number } = require('yup');

const createPermissionSchema = object().shape({
    name: string()
        .min(3, "Permission should be at least of 3 Characters")
        .max(20, "permission should be at most of 20 Characters")
        .required("Enter Permission name"),
    service: string()
        .required("Service name is required")
        .min(1, "Services must not be an empty array")
        .of(number().typeError("Service ID must be any number"))
})

const updatePermissionSchema = object().shape({
    name: string()
        .min(3, "Permission should be at least of 3 Characters")
        .max(20, "permission should be at most of 20 Characters")
        .required("Enter Permission name"),
    service: string()
        .required("Service name is required")
        .min(1, "Services must not be an empty array")
        .of(number().typeError("Service ID must be any number"))
})

module.exports.createPermissionSchema = createPermissionSchema;
module.exports.updatePermissionSchema = updatePermissionSchema;