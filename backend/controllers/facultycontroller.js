import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { faculty } from '../models/index.js';

dotenv.config();

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await faculty.findOne({ email });
    if (!data) {
      return res.status(404).send("Faculty not found");
    }

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: data._id, role: data.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      id: data._id,
      name: data.name,
      email: data.email,
      role: data.role
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error");
  }
};

// Logout Controller (Basic version, you can improve with token blacklist later)
export const logout = async (req, res) => {
  try {
    // Note: You can implement JWT blacklist or just handle token expiry
    res.status(200).send("Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send("Internal server error");
  }
};