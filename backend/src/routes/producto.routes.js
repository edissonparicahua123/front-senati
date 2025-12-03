const express = require("express");
const router = express.Router();
const productoController = require("../controllers/producto.controller");

// Get products below minimum stock
router.get("/low-stock", productoController.getLowStock);

// Get products by category
router.get("/categoria/:categoria", productoController.getByCategory);

// Get all products
router.get("/", productoController.getAll);

// Get product by ID
router.get("/:id", productoController.getById);

// Create new product
router.post("/", productoController.create);

// Update product
router.put("/:id", productoController.update);

// Update product stock
router.patch("/:id/stock", productoController.updateStock);

// Delete product
router.delete("/:id", productoController.delete);

module.exports = router;
