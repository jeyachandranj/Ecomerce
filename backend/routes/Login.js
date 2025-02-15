
const express = require('express');
const bcrypt = require('bcrypt');
const Register = require('../models/RegisterModel');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide email and password" });
        }

        // Find user
        const user = await Register.findOne({ email });
        
        // User doesn't exist
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Compare passwords
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Success response
        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;