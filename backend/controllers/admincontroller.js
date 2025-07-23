const express = require('express');
const mongoose = require('mongoose');
const user= require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registerFaculty = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await user.find({ email });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            },
            token
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    registerFaculty
};
