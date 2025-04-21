const Warehouse = require('../models/Warehouse');

// Get all warehouse entries
exports.getWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single warehouse by MongoDB Object ID
exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) return res.status(404).json({ error: 'Warehouse not found' });
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new warehouse entry
exports.createWarehouse = async (req, res) => {
  try {
    const {
      warehouseId,
      location,
      medicineName,
      batchNo,
      stockQuantity,
      receivedDate,
      expiryDate,
      expiryRisk,
      supplierName,
    } = req.body;

    const newWarehouse = new Warehouse({
      warehouseId,
      location,
      medicineName,
      batchNo,
      stockQuantity,
      receivedDate,
      expiryDate,
      expiryRisk,
      supplierName,
    });

    await newWarehouse.save();
    res.status(201).json(newWarehouse);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data', details: err.message });
  }
};

// Update warehouse entry by ID
exports.updateWarehouse = async (req, res) => {
  try {
    const updated = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Warehouse not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data', details: err.message });
  }
};

// Delete warehouse entry by ID
exports.deleteWarehouse = async (req, res) => {
  try {
    const deleted = await Warehouse.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Warehouse not found' });
    res.json({ message: 'Warehouse deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
