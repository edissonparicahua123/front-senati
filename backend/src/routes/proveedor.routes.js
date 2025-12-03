const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/proveedor.controller");

// Get all suppliers
router.get("/", proveedorController.getAll);

// Get supplier by ID
router.get("/:id", proveedorController.getById);

// Create new supplier
router.post("/", proveedorController.create);

// Update supplier
router.put("/:id", proveedorController.update);

// Delete supplier
router.delete("/:id", proveedorController.delete);

module.exports = router;
