const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

// GET all warehouses
router.get('/', warehouseController.getWarehouses);

// GET a single warehouse by MongoDB Object ID
router.get('/:id', warehouseController.getWarehouseById);

// POST a new warehouse
router.post('/', warehouseController.createWarehouse);

// PUT (update) warehouse by ID
router.put('/:id', warehouseController.updateWarehouse);

// DELETE warehouse by ID
router.delete('/:id', warehouseController.deleteWarehouse);

module.exports = router;
