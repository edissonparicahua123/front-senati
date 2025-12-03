const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");


const AuthUser = sequelize.define(
    'AuthUser', 
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
);

module.exports = AuthUser;