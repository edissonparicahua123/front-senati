const { Proveedor, Producto } = require("../models");

module.exports = {
    // Get all suppliers
    async getAll(req, res) {
        try {
            const proveedores = await Proveedor.findAll({
                order: [['nombre', 'ASC']]
            });
            res.json(proveedores);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener proveedores",
                error: error.message
            });
        }
    },

    // Get supplier by ID with their products
    async getById(req, res) {
        try {
            const { id } = req.params;
            const proveedor = await Proveedor.findByPk(id, {
                include: [{
                    model: Producto,
                    as: 'productos'
                }]
            });

            if (!proveedor) {
                return res.status(404).json({ mensaje: "Proveedor no encontrado" });
            }

            res.json(proveedor);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener proveedor",
                error: error.message
            });
        }
    },

    // Create new supplier
    async create(req, res) {
        try {
            const { nombre, telefono, correo, direccion } = req.body;

            if (!nombre) {
                return res.status(400).json({ mensaje: "El nombre es requerido" });
            }

            const nuevoProveedor = await Proveedor.create({
                nombre,
                telefono,
                correo,
                direccion
            });

            res.status(201).json({
                mensaje: "Proveedor creado exitosamente",
                proveedor: nuevoProveedor
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al crear proveedor",
                error: error.message
            });
        }
    },

    // Update supplier
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, telefono, correo, direccion } = req.body;

            const proveedor = await Proveedor.findByPk(id);

            if (!proveedor) {
                return res.status(404).json({ mensaje: "Proveedor no encontrado" });
            }

            await proveedor.update({
                nombre: nombre || proveedor.nombre,
                telefono: telefono !== undefined ? telefono : proveedor.telefono,
                correo: correo !== undefined ? correo : proveedor.correo,
                direccion: direccion !== undefined ? direccion : proveedor.direccion
            });

            res.json({
                mensaje: "Proveedor actualizado exitosamente",
                proveedor
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al actualizar proveedor",
                error: error.message
            });
        }
    },

    // Delete supplier
    async delete(req, res) {
        try {
            const { id } = req.params;
            const proveedor = await Proveedor.findByPk(id, {
                include: [{
                    model: Producto,
                    as: 'productos'
                }]
            });

            if (!proveedor) {
                return res.status(404).json({ mensaje: "Proveedor no encontrado" });
            }

            // Check if supplier has products
            if (proveedor.productos && proveedor.productos.length > 0) {
                return res.status(400).json({
                    mensaje: "No se puede eliminar el proveedor porque tiene productos asociados"
                });
            }

            await proveedor.destroy();

            res.json({ mensaje: "Proveedor eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al eliminar proveedor",
                error: error.message
            });
        }
    }
};
