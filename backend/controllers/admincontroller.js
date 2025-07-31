// controllers/facultyController.js

import faculty from '../models/faculty.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Register a new faculty
export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await faculty.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Faculty already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newFaculty = new faculty({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newFaculty.save();

        const token = jwt.sign({ userId: newFaculty._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            user: {
                id: newFaculty._id,
                name: newFaculty.name,
                email: newFaculty.email,
                role: newFaculty.role
            },
            token,
            message: 'Faculty registered successfully'
        });
    } catch (error) {
        console.error('Error registering faculty:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a faculty
export const updateFaculty = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try {
        const updatedFaculty = await faculty.findByIdAndUpdate(
            id,
            { name, email, role },
            { new: true }
        );
        if (!updatedFaculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }
        res.status(200).json({
            user: {
                id: updatedFaculty._id,
                name: updatedFaculty.name,
                email: updatedFaculty.email,
                role: updatedFaculty.role
            },
            message: 'Faculty updated successfully'
        });
    } catch (error) {
        console.error('Error updating faculty:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a faculty
export const deleteFaculty = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFaculty = await faculty.findByIdAndDelete(id);
        if (!deletedFaculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }
        res.status(200).json({ message: 'Faculty deleted successfully' });
    } catch (error) {
        console.error('Error deleting faculty:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// module.exports = {
//     registerUser,
//     updateFaculty,
//     deleteFaculty
// };
