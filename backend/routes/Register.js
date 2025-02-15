const express = require("express");
const Router = express.Router();
const Register = require('../models/RegisterModel');

Router.post('/', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    if (password !== confirmPassword) {
        return res.status(422).json({ error: "Passwords do not match" });
    }

    try {
        const userExist = await Register.findOne({ email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }

        const user = new Register({ email, password });
        await user.save();

        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error, please try again later." });
    }
});

module.exports = Router;
