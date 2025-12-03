const { Producto, Proveedor, Almacen, MovimientoInventario } = require("../models");
const { Op } = require("sequelize");

module.exports = {
    // Get all products with supplier and warehouse info
    async getAll(req, res) {
        try {
            const productos = await Producto.findAll({
                include: [
                    {
                        model: Proveedor,
                        as: 'proveedor',
                        attributes: ['id_proveedor', 'nombre', 'telefono', 'correo']
                    },
                    {
                        model: Almacen,
                        as: 'almacen',
                        attributes: ['id_almacen', 'nombre', 'ubicacion']
                    }
                ],
                order: [['nombre', 'ASC']]
            });
            res.json(productos);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener productos",
                error: error.message
            });
        }
    },

    // Get product by ID with full details
    async getById(req, res) {
        try {
            const { id } = req.params;
            const producto = await Producto.findByPk(id, {
                include: [
                    {
                        model: Proveedor,
                        as: 'proveedor'
                    },
                    {
                        model: Almacen,
                        as: 'almacen'
                    },
                    {
                        model: MovimientoInventario,
                        as: 'movimientos',
                        limit: 10,
                        order: [['fecha', 'DESC']]
                    }
                ]
            });

            if (!producto) {
                return res.status(404).json({ mensaje: "Producto no encontrado" });
            }

            res.json(producto);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener producto",
                error: error.message
            });
        }
    },

    // Get products below minimum stock
    async getLowStock(req, res) {
        try {
            const productos = await Producto.findAll({
                where: {
                    stock_actual: {
                        [Op.lte]: sequelize.col('stock_minimo')
                    }
                },
                include: [
                    {
                        model: Proveedor,
                        as: 'proveedor',
                        attributes: ['id_proveedor', 'nombre', 'telefono']
                    },
                    {
                        model: Almacen,
                        as: 'almacen',
                        attributes: ['id_almacen', 'nombre']
                    }
                ],
                order: [['stock_actual', 'ASC']]
            });
            res.json(productos);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener productos con stock bajo",
                error: error.message
            });
        }
    },

    // Get products by category
    async getByCategory(req, res) {
        try {
            const { categoria } = req.params;
            const productos = await Producto.findAll({
                where: { categoria },
                include: [
                    {
                        model: Proveedor,
                        as: 'proveedor',
                        attributes: ['id_proveedor', 'nombre']
                    },
                    {
                        model: Almacen,
                        as: 'almacen',
                        attributes: ['id_almacen', 'nombre']
                    }
                ],
                order: [['nombre', 'ASC']]
            });
            res.json(productos);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener productos por categoría",
                error: error.message
            });
        }
    },

    // Create new product
    async create(req, res) {
        try {
            const {
                nombre, marca, modelo, categoria, descripcion,
                precio_compra, precio_venta, stock_actual, stock_minimo,
                id_proveedor, id_almacen
            } = req.body;

            if (!nombre || !precio_compra || !precio_venta) {
                return res.status(400).json({
                    mensaje: "Nombre, precio de compra y precio de venta son requeridos"
                });
            }

            const nuevoProducto = await Producto.create({
                nombre, marca, modelo, categoria, descripcion,
                precio_compra, precio_venta, stock_actual, stock_minimo,
                id_proveedor, id_almacen
            });

            // Load relationships
            await nuevoProducto.reload({
                include: [
                    { model: Proveedor, as: 'proveedor' },
                    { model: Almacen, as: 'almacen' }
                ]
            });

            res.status(201).json({
                mensaje: "Producto creado exitosamente",
                producto: nuevoProducto
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al crear producto",
                error: error.message
            });
        }
    },

    // Update product
    async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const producto = await Producto.findByPk(id);

            if (!producto) {
                return res.status(404).json({ mensaje: "Producto no encontrado" });
            }

            await producto.update(updateData);

            // Reload with relationships
            await producto.reload({
                include: [
                    { model: Proveedor, as: 'proveedor' },
                    { model: Almacen, as: 'almacen' }
                ]
            });

            res.json({
                mensaje: "Producto actualizado exitosamente",
                producto
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al actualizar producto",
                error: error.message
            });
        }
    },

    // Update product stock (creates movement record)
    async updateStock(req, res) {
        try {
            const { id } = req.params;
            const { cantidad, tipo_movimiento, usuario_responsable, motivo } = req.body;

            if (!cantidad || !tipo_movimiento || !usuario_responsable) {
                return res.status(400).json({
                    mensaje: "Cantidad, tipo de movimiento y usuario responsable son requeridos"
                });
            }

            const producto = await Producto.findByPk(id);

            if (!producto) {
                return res.status(404).json({ mensaje: "Producto no encontrado" });
            }

            // Calculate new stock
            let nuevoStock = producto.stock_actual;
            if (tipo_movimiento === 'entrada' || tipo_movimiento === 'ajuste') {
                nuevoStock += parseInt(cantidad);
            } else if (tipo_movimiento === 'salida') {
                nuevoStock -= parseInt(cantidad);
            }

            if (nuevoStock < 0) {
                return res.status(400).json({
                    mensaje: "Stock insuficiente para realizar la salida"
                });
            }

            // Update stock
            await producto.update({ stock_actual: nuevoStock });

            // Create movement record
            await MovimientoInventario.create({
                id_producto: id,
                tipo_movimiento,
                cantidad,
                usuario_responsable,
                motivo
            });

            res.json({
                mensaje: "Stock actualizado exitosamente",
                producto,
                stock_anterior: producto.stock_actual,
                stock_nuevo: nuevoStock
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al actualizar stock",
                error: error.message
            });
        }
    },

    // Delete product
    async delete(req, res) {
        try {
            const { id } = req.params;
            const producto = await Producto.findByPk(id);

            if (!producto) {
                return res.status(404).json({ mensaje: "Producto no encontrado" });
            }

            await producto.destroy();

            res.json({ mensaje: "Producto eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al eliminar producto",
                error: error.message
            });
        }
    }
};
