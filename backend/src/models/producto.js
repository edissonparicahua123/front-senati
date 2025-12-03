const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const Producto = sequelize.define(
    "Producto",
    {
        id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        marca: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        modelo: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        categoria: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        precio_compra: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        precio_venta: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        stock_actual: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stock_minimo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_proveedor: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'proveedor',
                key: 'id_proveedor'
            }
        },
        id_almacen: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'almacen',
                key: 'id_almacen'
            }
        }
    },
    {
        tableName: "producto",
        timestamps: true
    }
);

module.exports = Producto;
