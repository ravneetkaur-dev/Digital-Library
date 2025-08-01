// const user = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const password='Raju123';
//    export const createAdmin = async () => {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newAdmin = new user({
//             name,
//             email,
//             role,
//             password: hashedPassword
//         });
//         console.log('Admin created successfully',newAdmin);
// }
// export const permissions = {
//     canUpdate: true,
//     canEdit: true,
//     canDelete: true,
//     canManageFaculty: true
// };
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { user } from '../models/User.js'; // correct import if using ES module

export const createAdmin = async () => {
  try {
    const name = "raju";
    const email = "raju@gmail.com";
    const role = "admin";
    const plainPassword = "Raju123";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newAdmin = new user({
      name,
      email,
      role,
      password: hashedPassword
    });

    await newAdmin.save(); // ✅ Save to DB
    console.log("✅ Admin created successfully:", newAdmin);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  }
};

// ✅ Call the function
//createAdmin();

