const mongoose = require('mongoose');

const barcodeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  scannedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Barcode', barcodeSchema);
