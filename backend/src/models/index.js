const sequelize = require("../settings/db");
const Usuario = require("./auth");
const Categoria = require("./categoria");
const Proveedor = require("./proveedor");
const Almacen = require("./almacen");
const Producto = require("./producto");
const MovimientoInventario = require("./movimiento_inventario");

// Define associations (relationships)

// Producto belongs to Proveedor
Producto.belongsTo(Proveedor, {
    foreignKey: 'id_proveedor',
    as: 'proveedor'
});

// Proveedor has many Productos
Proveedor.hasMany(Producto, {
    foreignKey: 'id_proveedor',
    as: 'productos'
});

// Producto belongs to Almacen
Producto.belongsTo(Almacen, {
    foreignKey: 'id_almacen',
    as: 'almacen'
});

// Almacen has many Productos
Almacen.hasMany(Producto, {
    foreignKey: 'id_almacen',
    as: 'productos'
});

// MovimientoInventario belongs to Producto
MovimientoInventario.belongsTo(Producto, {
    foreignKey: 'id_producto',
    as: 'producto'
});

// Producto has many MovimientoInventario
Producto.hasMany(MovimientoInventario, {
    foreignKey: 'id_producto',
    as: 'movimientos'
});

module.exports = {
    sequelize,
    Usuario,
    Categoria,
    Proveedor,
    Almacen,
    Producto,
    MovimientoInventario
};
