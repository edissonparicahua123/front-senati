const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const Categoria = sequelize.define(
    "Categoria",
    {
        id_categoria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        tableName: "categoria",
        timestamps: true
    }
);

module.exports = Categoria;
