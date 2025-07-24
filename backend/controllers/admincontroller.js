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
    export const updateFaculty = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try {
        const updatedFaculty = await faculty.findByIdAndUpdate(id,{ name, email, role },{ new: true });
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
    }
    export const candelete=async(req,res)=>{
const {id}=req.params;

try{
   
    const deletefaculty=await faculty.findByIdAndDelete(id);

    if(!deletefaculty){
        return res.status(404).json({message:'Faculty not found'});
    }
    res.status(200).json({message:'Faculty deleted successfully'});

}
catch(error){
    res.status(500).json({message:"internal server error"});
}
    }
