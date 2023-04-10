const sequelize = require('../../config/lib/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const Profile = sequelize.define("profiles",{
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
    description: {
        allowNull: false,
        type: DataTypes.JSON
    },
    type: {
        type: DataTypes.ENUM,
        values: ["standard", "custom"],
        defaultValue: "custom"
    },
    created_by: {
        type: DataTypes.UUIDV4
    },
    updated_by: {
        type: DataTypes.UUIDV4
    }
}, {
    tableName: "profiles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

module.exports = Profile;