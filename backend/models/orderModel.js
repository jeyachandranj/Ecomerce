const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  BookTitle: { type: String },
  Author: { type: String },
  Price: { type: Number },
  BookImage: { type: String },
  quantity: { type: Number },
  category: { type: String },
});

const PaymentSchema = new mongoose.Schema({
  products: [ProductSchema], // Array of product objects
  paymentStatus: { type: String },
  timestamp: { type: Date, default: Date.now },
  address: {
    firstName: { type: String },
    lastName: { type: String },
    streetAddress: { type: String },
    landmark: { type: String },
    pincode: { type: String },
  },
});

module.exports = mongoose.model('Order', PaymentSchema);
