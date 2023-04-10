const sequelize = require('../../config/lib/sequelize');
const Permission = require('./permission.model');
const { DataTypes } = require('sequelize');
const Service = require('../service/service.model');

const ServicePermission = sequelize.define("service-permission", {
    id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    service_id: {
        type: DataTypes.UUID
    },
    permission_id: {
        type: DataTypes.UUID
    }
}, {
    tableName: "service-permission",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

Permission.hasMany(ServicePermission, {
    as: "permissionServices",
    foreignKey: "permission_id"
})

ServicePermission.belongsTo(Service, {
    as: "service",
    foreignKey: "service_id"
})

module.exports = ServicePermission;