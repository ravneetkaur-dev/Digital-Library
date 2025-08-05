import admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ✅ Create Admin (this can be called manually if needed)
export const createAdmin = async (req, res) => {
  try {
    const name = "raju";
    const email = "raju@gmail.com";
    const role = "admin";
    const plainPassword = "Raju123";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const profileImage = req.file
      ? `/uploads/profileImages/${req.file.filename}`
      : "/backend/utils/images/images.jpeg";

    const newAdmin = new admin({
      name,
      email,
      role,
      profileImage,
      password: hashedPassword
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
  } catch (err) {
    console.error("Error creating admin:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Admin Profile Image
export const updateProfileImage = async (req, res) => {
  try {
    const adminId = req.params.id;

    const profileImage = req.file
      ? `/uploads/profileImages/${req.file.filename}`
      : "/backend/utils/images/images.jpeg";

    const updatedAdmin = await admin.findByIdAndUpdate(
      adminId,
      { profileImage },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      message: "Profile image updated successfully",
      admin: updatedAdmin
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

