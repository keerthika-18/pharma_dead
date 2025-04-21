const express = require('express');
const router = express.Router();
const {
  getAnnualProfit,
  getExpiredVsSold,
  getStockTurnover
} = require('../controllers/reportController');

router.get('/annual-profit', getAnnualProfit);
router.get('/expired-vs-sold', getExpiredVsSold);
router.get('/stock-turnover', getStockTurnover);

module.exports = router;
