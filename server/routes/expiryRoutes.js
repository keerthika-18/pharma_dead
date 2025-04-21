const express = require('express');
const router = express.Router();
const expiryPredictionController = require('../controllers/expiryController');

router.post('/predict', expiryPredictionController.predictExpiryRisk);

module.exports = router;
