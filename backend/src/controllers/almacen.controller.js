const { Almacen, Producto } = require("../models");

module.exports = {
    // Get all warehouses
    async getAll(req, res) {
        try {
            const almacenes = await Almacen.findAll({
                order: [['nombre', 'ASC']]
            });
            res.json(almacenes);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener almacenes",
                error: error.message
            });
        }
    },

    // Get warehouse by ID with inventory
    async getById(req, res) {
        try {
            const { id } = req.params;
            const almacen = await Almacen.findByPk(id, {
                include: [{
                    model: Producto,
                    as: 'productos'
                }]
            });

            if (!almacen) {
                return res.status(404).json({ mensaje: "Almacén no encontrado" });
            }

            res.json(almacen);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener almacén",
                error: error.message
            });
        }
    },

    // Create new warehouse
    async create(req, res) {
        try {
            const { nombre, ubicacion } = req.body;

            if (!nombre) {
                return res.status(400).json({ mensaje: "El nombre es requerido" });
            }

            const nuevoAlmacen = await Almacen.create({
                nombre,
                ubicacion
            });

            res.status(201).json({
                mensaje: "Almacén creado exitosamente",
                almacen: nuevoAlmacen
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al crear almacén",
                error: error.message
            });
        }
    },

    // Update warehouse
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, ubicacion } = req.body;

            const almacen = await Almacen.findByPk(id);

            if (!almacen) {
                return res.status(404).json({ mensaje: "Almacén no encontrado" });
            }

            await almacen.update({
                nombre: nombre || almacen.nombre,
                ubicacion: ubicacion !== undefined ? ubicacion : almacen.ubicacion
            });

            res.json({
                mensaje: "Almacén actualizado exitosamente",
                almacen
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al actualizar almacén",
                error: error.message
            });
        }
    },

    // Delete warehouse
    async delete(req, res) {
        try {
            const { id } = req.params;
            const almacen = await Almacen.findByPk(id, {
                include: [{
                    model: Producto,
                    as: 'productos'
                }]
            });

            if (!almacen) {
                return res.status(404).json({ mensaje: "Almacén no encontrado" });
            }

            // Check if warehouse has products
            if (almacen.productos && almacen.productos.length > 0) {
                return res.status(400).json({
                    mensaje: "No se puede eliminar el almacén porque tiene productos asociados"
                });
            }

            await almacen.destroy();

            res.json({ mensaje: "Almacén eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al eliminar almacén",
                error: error.message
            });
        }
    }
};
