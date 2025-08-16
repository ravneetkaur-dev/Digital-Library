
import admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { admin } from '../models/Admin.js'; 
export const createAdmin = async () => {
  try {
    const name = "raju";
    const email = "raju@gmail.com";
    const role = "admin";
    const plainPassword = "Raju123";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newAdmin = new admin({
      name,
      email,
      role,
      password: hashedPassword
    });

    await newAdmin.save(); 
    console.log(" Admin created successfully:", newAdmin);
  } catch (err) {
    console.error(" Error creating admin:", err);
  }
};


