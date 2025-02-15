const express = require('express');
const Payment = require('../models/orderModel');

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/payment', async (req, res) => {
  try {
    const { products, paymentStatus, timestamp, address } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products must be a non-empty array' });
    }

    const newPayment = new Payment({
      products,
      paymentStatus,
      timestamp,
      address,
    });

    const savedPayment = await newPayment.save();
    res.status(201).json({ message: 'Payment saved successfully', savedPayment });
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ message: 'Failed to save payment', error });
  }
});

module.exports = router;
