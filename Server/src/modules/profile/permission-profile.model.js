const { DataTypes } = require('sequelize');
const sequelize = require('../../config/lib/sequelize');
const Profile = require('./profile.model');
const Permission = require('../permissions/permission.model');

const PermissionProfile = sequelize.define("permission-profiles", {
    id: {
        allowNull: false,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    permission_id: {
        type: DataTypes.UUID
    },
    profile_id: {
        type: DataTypes.UUID
    }
}, {
    tableName: "permission-profiles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

Profile.hasMany(PermissionProfile, {
    as: "permissionProfiles",
    foreignKey: "profile_id"
});

PermissionProfile.belongsTo(Permission, {
    as: "permission",
    foreignKey: "permission_id"
})

module.exports = PermissionProfile;