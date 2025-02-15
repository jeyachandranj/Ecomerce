const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  BookTitle: {
    type: String,
    required: true
  },
  Author: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  BookImage: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
});

const CartItem = mongoose.model('CartItem', CartItemSchema);
module.exports = CartItem;
