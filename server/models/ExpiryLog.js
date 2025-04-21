const mongoose = require('mongoose');

const expiryLogSchema = new mongoose.Schema({
  logId: { type: String, required: true },
  medicineName: { type: String, required: true },
  batchNo: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  expiryRisk: { type: String, required: true },
  logDate: { type: Date, required: true },
  actionTaken: { type: String, required: true },
  warehouseId: { type: String, required: true }
});

module.exports = mongoose.model('ExpiryLog', expiryLogSchema);
