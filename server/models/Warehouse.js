const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  warehouseId: { type: String, required: true },
  location: { type: String, required: true },
  medicineName: { type: String, required: true },
  batchNo: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  receivedDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  expiryRisk: { type: String, required: true },
  supplierName: { type: String, required: true }
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
