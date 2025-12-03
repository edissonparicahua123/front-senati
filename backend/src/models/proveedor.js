const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const Proveedor = sequelize.define(
    "Proveedor",
    {
        id_proveedor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                isEmail: true
            }
        },
        direccion: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        tableName: "proveedor",
        timestamps: true
    }
);

module.exports = Proveedor;
