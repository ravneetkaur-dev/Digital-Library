const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const password='Raju123';
   export const createAdmin = async () => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new user({
            name:'Raju',
            email:'raju@gmail.com',
            role:'admin',
            password: hashedPassword
        });
        console.log('Admin created successfully',newAdmin);
}
