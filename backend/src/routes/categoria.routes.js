const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoria.controller");

// Get all categories
router.get("/", categoriaController.getAll);

// Get category by ID
router.get("/:id", categoriaController.getById);

// Create new category
router.post("/", categoriaController.create);

// Update category
router.put("/:id", categoriaController.update);

// Delete category
router.delete("/:id", categoriaController.delete);

module.exports = router;
