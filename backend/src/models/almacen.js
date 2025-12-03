const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const Almacen = sequelize.define(
    "Almacen",
    {
        id_almacen: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        ubicacion: {
            type: DataTypes.STRING(200),
            allowNull: true
        }
    },
    {
        tableName: "almacen",
        timestamps: true
    }
);

module.exports = Almacen;
