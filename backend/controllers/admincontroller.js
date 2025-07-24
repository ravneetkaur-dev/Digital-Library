// admincontroller.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/Admin.js';

export const registeruser = async (req, res) => {
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
};
