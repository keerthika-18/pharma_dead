const express = require('express');
const router = express.Router();
const Barcode = require('../models/Barcode');

router.post('/', async (req, res) => {
  try {
    const newBarcode = new Barcode({ code: req.body.code });
    await newBarcode.save();
    res.status(201).json({ message: 'Barcode saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save barcode' });
  }
});

router.get('/', async (req, res) => {
  try {
    const barcodes = await Barcode.find().sort({ scannedAt: -1 });
    res.json(barcodes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch barcodes' });
  }
});

module.exports = router;
