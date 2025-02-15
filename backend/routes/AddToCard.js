const express = require('express');
const CartItem = require('../models/AddToCard');
const router = express.Router();

router.post('/add', async (req, res) => {
  const { BookTitle, Author, Price, BookImage ,name} = req.body;

  const existingCartItem = await CartItem.findOne({ BookTitle });

  if (existingCartItem) {
    return res.status(400).json({ message: 'Item already in cart' });
  }

  const newCartItem = new CartItem({
    BookTitle,
    Author,
    Price,
    BookImage,
    userName: name
  });

  try {
    const savedCartItem = await newCartItem.save();
    res.status(200).json(savedCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get user's cart items
router.get("/:name", async (req, res) => {
  try {
    const { name } = req.params; 
    const cartItems = await CartItem.find({ userName: name }); 
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Remove item from cart
router.delete('/remove/:id', async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
