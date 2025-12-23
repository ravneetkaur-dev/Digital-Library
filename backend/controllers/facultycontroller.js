import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { faculty } from '../models/index.js';
import uploadDir from '../config/uploads.js';

dotenv.config();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
        const facultyFolder = path.join(uploadDir, 'facultyimages'); // /tmp/uploads/facultyimages
        if (!fs.existsSync(facultyFolder)) {
            fs.mkdirSync(facultyFolder, { recursive: true });
        }
        cb(null, facultyFolder);
    },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage }); // define upload
// Login Controller
export const login = async (req, res) => {
  const { email, password,role } = req.body;

  try {
    const data = await faculty.findOne({ email, role });
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
    return res.status(200).json({message: "Login successful",token,
      id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
      designation: data.designation,
      department: data.department,
      subjects: data.subjects,
      profileImage: data.profileImage
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
    // Note: You can implement JWT blacklist or just handle token expiry
    res.status(200).send("Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send("Internal server error");
  }
};
export const updateProfileImage = async (req, res) => {
  try {
    const facultyId = req.params.id;

    const profileImage = req.file
      ? `/uploads/facultyimages/${req.file.filename}`
      : "/backend/utils/images/images.jpeg";

    const updatedFaculty = await faculty.findByIdAndUpdate(
      facultyId,
      { profileImage },
      { new: true }
    );

    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json({
      message: "Profile image updated successfully",
      faculty: updatedFaculty
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};