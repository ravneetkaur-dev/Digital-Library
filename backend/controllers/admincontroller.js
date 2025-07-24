const express = require('express');
const mongoose = require('mongoose');
const user= require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.get = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        // Check if user already exists
        const existingUser = await user.find({ email });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            role
        });
        // Save the user to the database
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            },
            message: 'User registered successfully'
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// module.exports = {
//     registeruser
// };
