const express = require("express");
const router = express.Router();
const movimientoController = require("../controllers/movimiento.controller");

// Get movement report
router.get("/report", movimientoController.getReport);

// Get movements by product
router.get("/producto/:id", movimientoController.getByProduct);

// Get movements by date range
router.get("/date-range", movimientoController.getByDateRange);

// Get all movements
router.get("/", movimientoController.getAll);

// Create new movement
router.post("/", movimientoController.create);

module.exports = router;
