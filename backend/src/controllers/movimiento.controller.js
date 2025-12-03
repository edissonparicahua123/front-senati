const { MovimientoInventario, Producto } = require("../models");
const { Op } = require("sequelize");

module.exports = {
    // Get all movements with product info
    async getAll(req, res) {
        try {
            const movimientos = await MovimientoInventario.findAll({
                include: [{
                    model: Producto,
                    as: 'producto',
                    attributes: ['id_producto', 'nombre', 'marca', 'modelo']
                }],
                order: [['fecha', 'DESC']],
                limit: 100 // Limit to last 100 movements
            });
            res.json(movimientos);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener movimientos",
                error: error.message
            });
        }
    },

    // Get movements for specific product
    async getByProduct(req, res) {
        try {
            const { id } = req.params;
            const movimientos = await MovimientoInventario.findAll({
                where: { id_producto: id },
                include: [{
                    model: Producto,
                    as: 'producto',
                    attributes: ['id_producto', 'nombre', 'marca', 'modelo']
                }],
                order: [['fecha', 'DESC']]
            });
            res.json(movimientos);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener movimientos del producto",
                error: error.message
            });
        }
    },

    // Get movements within date range
    async getByDateRange(req, res) {
        try {
            const { fecha_inicio, fecha_fin } = req.query;

            if (!fecha_inicio || !fecha_fin) {
                return res.status(400).json({
                    mensaje: "Fecha de inicio y fecha fin son requeridas"
                });
            }

            const movimientos = await MovimientoInventario.findAll({
                where: {
                    fecha: {
                        [Op.between]: [new Date(fecha_inicio), new Date(fecha_fin)]
                    }
                },
                include: [{
                    model: Producto,
                    as: 'producto',
                    attributes: ['id_producto', 'nombre', 'marca', 'modelo']
                }],
                order: [['fecha', 'DESC']]
            });
            res.json(movimientos);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener movimientos por rango de fechas",
                error: error.message
            });
        }
    },

    // Create new movement and update product stock
    async create(req, res) {
        try {
            const { id_producto, tipo_movimiento, cantidad, usuario_responsable, motivo } = req.body;

            if (!id_producto || !tipo_movimiento || !cantidad || !usuario_responsable) {
                return res.status(400).json({
                    mensaje: "Producto, tipo de movimiento, cantidad y usuario responsable son requeridos"
                });
            }

            const producto = await Producto.findByPk(id_producto);

            if (!producto) {
                return res.status(404).json({ mensaje: "Producto no encontrado" });
            }

            // Calculate new stock
            let nuevoStock = producto.stock_actual;
            const cantidadNum = parseInt(cantidad);

            if (tipo_movimiento === 'entrada') {
                nuevoStock += cantidadNum;
            } else if (tipo_movimiento === 'salida') {
                nuevoStock -= cantidadNum;
                if (nuevoStock < 0) {
                    return res.status(400).json({
                        mensaje: "Stock insuficiente para realizar la salida"
                    });
                }
            } else if (tipo_movimiento === 'ajuste') {
                nuevoStock = cantidadNum; // For adjustments, set to exact amount
            }

            // Update product stock
            await producto.update({ stock_actual: nuevoStock });

            // Create movement record
            const nuevoMovimiento = await MovimientoInventario.create({
                id_producto,
                tipo_movimiento,
                cantidad: cantidadNum,
                usuario_responsable,
                motivo
            });

            // Reload with product info
            await nuevoMovimiento.reload({
                include: [{
                    model: Producto,
                    as: 'producto'
                }]
            });

            res.status(201).json({
                mensaje: "Movimiento registrado exitosamente",
                movimiento: nuevoMovimiento,
                stock_anterior: producto.stock_actual,
                stock_nuevo: nuevoStock
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al crear movimiento",
                error: error.message
            });
        }
    },

    // Generate inventory movement report
    async getReport(req, res) {
        try {
            const { tipo_movimiento, fecha_inicio, fecha_fin } = req.query;

            let whereClause = {};

            if (tipo_movimiento) {
                whereClause.tipo_movimiento = tipo_movimiento;
            }

            if (fecha_inicio && fecha_fin) {
                whereClause.fecha = {
                    [Op.between]: [new Date(fecha_inicio), new Date(fecha_fin)]
                };
            }

            const movimientos = await MovimientoInventario.findAll({
                where: whereClause,
                include: [{
                    model: Producto,
                    as: 'producto',
                    attributes: ['id_producto', 'nombre', 'marca', 'modelo', 'categoria']
                }],
                order: [['fecha', 'DESC']]
            });

            // Calculate summary
            const resumen = {
                total_movimientos: movimientos.length,
                entradas: movimientos.filter(m => m.tipo_movimiento === 'entrada').length,
                salidas: movimientos.filter(m => m.tipo_movimiento === 'salida').length,
                ajustes: movimientos.filter(m => m.tipo_movimiento === 'ajuste').length,
                cantidad_total_entrada: movimientos
                    .filter(m => m.tipo_movimiento === 'entrada')
                    .reduce((sum, m) => sum + m.cantidad, 0),
                cantidad_total_salida: movimientos
                    .filter(m => m.tipo_movimiento === 'salida')
                    .reduce((sum, m) => sum + m.cantidad, 0)
            };

            res.json({
                resumen,
                movimientos
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al generar reporte",
                error: error.message
            });
        }
    }
};
