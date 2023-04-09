const sequelize = require('../../config/lib/sequelize');
const { DataTypes } = require('sequelize');

const Service = sequelize.define('service', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING
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
    tableName: 'services',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
    
});

module.exports = Service;