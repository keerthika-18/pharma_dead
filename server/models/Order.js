const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerName: { type: String, required: true },
  medicineName: { type: String, required: true },
  batchNo: { type: String, required: true },
  quantity: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  status: { type: String, required: true },
  totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema, 'Orders'); // use exact collection name

