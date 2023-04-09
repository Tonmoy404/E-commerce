const sequelize = require('../../config/lib/sequelize');
const { DataTypes } = require('sequelize');

const Permission  = sequelize.define("Permission", {
    id: {
        allowNull: false,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    services : {
        allowNull: false,
        type: DataTypes.JSON
    },
    created_by: {
        allowNull: false,
        type: DataTypes.UUID
    },
    updated_by: {
        allowNull: false,
        type: DataTypes.UUID
    }

}, {
    tableName: "permission",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = Permission;