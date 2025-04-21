// const Order = require('../models/Order');
// const ExpiryLog = require('../models/ExpiryLog');

// exports.getAnnualProfit = async (req, res) => {
//   try {
//     const orders = await Order.find({});
//     const annualProfit = {};

//     orders.forEach(order => {
//       const year = new Date(order.orderDate).getFullYear();
//       annualProfit[year] = (annualProfit[year] || 0) + order.totalAmount;
//     });

//     res.json(annualProfit);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch annual profit.' });
//   }
// };

// exports.getSalesVsExpired = async (req, res) => {
//   try {
//     const totalSales = await Order.aggregate([
//       { $group: { _id: null, totalSold: { $sum: "$quantity" } } }
//     ]);

//     const totalExpired = await ExpiryLog.countDocuments({ actionTaken: "Expired" });

//     res.json({
//       sold: totalSales[0]?.totalSold || 0,
//       expired: totalExpired
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch sales vs expired data.' });
//   }
// };
const Order = require('../models/Order');
const ExpiryLog = require('../models/ExpiryLog');
const Warehouse = require('../models/Warehouse');
// const orders = await Order.find({});
// ✅ Add this

// Calculate Annual Profit
exports.getAnnualProfit = async (req, res) => {
  try {
    const orders = await Order.find({});
    console.log('Orders:', orders); 
    let totalSales = 0;
    orders.forEach(order => {
      totalSales += order.totalAmount;
    });

    // Estimate cost (for example, assume 60% of total sales)
    const estimatedCost = totalSales * 0.6;
    const annualProfit = totalSales - estimatedCost;

    res.json({
      totalSales,
      estimatedCost,
      annualProfit
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate annual profit' });
  }
};

// Get count of expired stock vs sold
// exports.getExpiredVsSold = async (req, res) => {
//   try {
//     const expiredCount = await ExpiryLog.countDocuments();

//     const orders = await Order.find({});
//     let soldQuantity = 0;
//     orders.forEach(order => {
//       soldQuantity += order.quantity;
//     });

//     res.json({
//       expired: expiredCount,
//       sold: soldQuantity
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch expired vs sold data' });
//   }
// };
exports.getExpiredVsSold = async (req, res) => {
  try {
    const expiredCount = await ExpiryLog.countDocuments();

    const orders = await Order.find({});
    let soldQuantity = 0;
    orders.forEach(order => {
      soldQuantity += order.quantity;
    });

    res.json({
      expired: expiredCount,
      sold: soldQuantity
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expired vs sold data' });
  }
};

// Calculate stock turnover
exports.getStockTurnover = async (req, res) => {
  try {
    const orders = await Order.find({});
const warehouseItems = await Warehouse.find({});
// console.log('Orders:', orders);
// console.log('Warehouse Items:', warehouseItems);

    let totalSold = 0;
    let totalInventory = 0;

    orders.forEach(order => {
      totalSold += order.quantity;
    });

    warehouseItems.forEach(item => {
      totalInventory += item.stockQuantity;
    });

    const averageInventory = totalInventory / (warehouseItems.length || 1);
    const stockTurnover = averageInventory === 0 ? 0 : (totalSold / averageInventory).toFixed(2);

    res.json({
      totalSold,
      averageInventory,
      stockTurnover
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate stock turnover' });
  }
};
