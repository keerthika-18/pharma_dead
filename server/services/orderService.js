const Order = require('../models/Order');

exports.getAllOrders = () => Order.find();
exports.getOrderById = (id) => Order.findById(id);
exports.createOrder = (data) => Order.create(data);
exports.updateOrder = (id, data) => Order.findByIdAndUpdate(id, data, { new: true });
exports.deleteOrder = (id) => Order.findByIdAndDelete(id);
