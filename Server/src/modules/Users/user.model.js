const sequelize = require('../../config/lib/sequelize');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const User = sequelize.define("users", {
    id:{
        allowNull: false,
        primaryKey:true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    // profile_id:{
    //     allowNull: false,
    //     type: DataTypes.UUID
    // },
    firstName: {
        allowNull: false,
        type: DataTypes.UUID
    },
    lastName: {
        allowNull: false,
        type: DataTypes.UUID
    },
    email:{
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        set(value){
            this.setDataValue("email", value.toLowerCase())
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        set(values){
            this.setDataValue("password", bcrypt.hashSync(values, 8));
        }
    }
},{
    timestamps: true,
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_by"
});

User.prototype.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = User;