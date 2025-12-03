const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const User = sequelize.define(
    "user",
    {
        username: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
        // mas atributos
    },
    {
        tableName: "user",
        timestamps: false
    }
);

module.exports = User;
