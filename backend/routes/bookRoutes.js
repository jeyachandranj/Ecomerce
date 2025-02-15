const express = require('express');
const Product = require('../models/bookModel');

const router = express.Router();

router.get("/products", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.post("/products", async (req, res) => {
    const { title, author, price, quantity,category, image, description } = req.body;
  
    const product = new Product({ title, author, price, quantity,category, image, description });
  
    try {
      await product.save();
      res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
