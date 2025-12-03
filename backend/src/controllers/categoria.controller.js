const { Categoria } = require("../models");

module.exports = {
    // Get all categories
    async getAll(req, res) {
        try {
            const categorias = await Categoria.findAll({
                order: [['nombre', 'ASC']]
            });
            res.json(categorias);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener categorías",
                error: error.message
            });
        }
    },

    // Get category by ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const categoria = await Categoria.findByPk(id);

            if (!categoria) {
                return res.status(404).json({ mensaje: "Categoría no encontrada" });
            }

            res.json(categoria);
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al obtener categoría",
                error: error.message
            });
        }
    },

    // Create new category
    async create(req, res) {
        try {
            const { nombre, descripcion } = req.body;

            if (!nombre) {
                return res.status(400).json({ mensaje: "El nombre es requerido" });
            }

            const nuevaCategoria = await Categoria.create({
                nombre,
                descripcion
            });

            res.status(201).json({
                mensaje: "Categoría creada exitosamente",
                categoria: nuevaCategoria
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al crear categoría",
                error: error.message
            });
        }
    },

    // Update category
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, descripcion } = req.body;

            const categoria = await Categoria.findByPk(id);

            if (!categoria) {
                return res.status(404).json({ mensaje: "Categoría no encontrada" });
            }

            await categoria.update({
                nombre: nombre || categoria.nombre,
                descripcion: descripcion !== undefined ? descripcion : categoria.descripcion
            });

            res.json({
                mensaje: "Categoría actualizada exitosamente",
                categoria
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al actualizar categoría",
                error: error.message
            });
        }
    },

    // Delete category
    async delete(req, res) {
        try {
            const { id } = req.params;
            const categoria = await Categoria.findByPk(id);

            if (!categoria) {
                return res.status(404).json({ mensaje: "Categoría no encontrada" });
            }

            await categoria.destroy();

            res.json({ mensaje: "Categoría eliminada exitosamente" });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al eliminar categoría",
                error: error.message
            });
        }
    }
};
