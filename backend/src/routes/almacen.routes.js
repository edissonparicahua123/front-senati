const express = require("express");
const router = express.Router();
const almacenController = require("../controllers/almacen.controller");

// Get all warehouses
router.get("/", almacenController.getAll);

// Get warehouse by ID
router.get("/:id", almacenController.getById);

// Create new warehouse
router.post("/", almacenController.create);

// Update warehouse
router.put("/:id", almacenController.update);

// Delete warehouse
router.delete("/:id", almacenController.delete);

module.exports = router;
