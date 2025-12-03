const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const MovimientoInventario = sequelize.define(
    "MovimientoInventario",
    {
        id_movimiento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_producto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'producto',
                key: 'id_producto'
            }
        },
        tipo_movimiento: {
            type: DataTypes.ENUM('entrada', 'salida', 'ajuste'),
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        usuario_responsable: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        motivo: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        tableName: "movimiento_inventario",
        timestamps: true
    }
);

module.exports = MovimientoInventario;
