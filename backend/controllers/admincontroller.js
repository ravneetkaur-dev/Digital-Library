import bcrypt from 'bcryptjs';
import faculty from '../models/faculty.js';

export const registeruser = async (req, res) => {
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

        res.status(201).json({
            user: {
                id: newFaculty._id,
                name: newFaculty.name,
                email: newFaculty.email,
                role: newFaculty.role
            },
            message: 'Faculty registered successfully'
        });
    } catch (error) {
        console.error('Error registering faculty:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
