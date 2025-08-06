
import admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';

const password='Raju123';
   export const createAdmin = async () => {
    const user=admin
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new user({
            name:'Raju',
            email:'raju@gmail.com',
            role:'admin',
            password: hashedPassword
        });
        console.log('Admin created successfully',newAdmin);
await newAdmin.save()
}
export const permissions = {
    canUpdate: true,
    canEdit: true,
    canDelete: true,
    canManageFaculty: true
};
