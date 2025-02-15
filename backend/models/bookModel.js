const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
   title: String,
  author: String,
  price: Number,
  quantity: Number,
  category: String,
  image: String,
  description: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
