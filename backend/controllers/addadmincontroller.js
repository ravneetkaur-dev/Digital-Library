import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import admin from "../models/Admin.js";

dotenv.config();

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const isexist = await admin.findOne({ email });

        if (!isexist || isexist.role !== "admin") {
            return res.status(400).json({ message: "Admin not found or unauthorized access" });
        }

        // 🔥 DO NOT re-hash the password — just compare the plain text with the hash
        const ismatch = await bcrypt.compare(password, isexist.password);

        if (!ismatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: isexist._id, role: isexist.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            id: isexist._id,
            name: isexist.name,
            email: isexist.email,
            role: isexist.role
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Internal server error");
    }
};
