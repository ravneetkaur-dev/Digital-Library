import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:["admin","faculty"],
        require:true
    },
    permission:{
        canUpdate:{type:Boolean,default:false},
        canEdit:{type:Boolean,default:false},
        canDelete:{type:Boolean,default:false},
        canManageFaculty:{type:Boolean,default:false},
    },
    createdAt:{
       type:Date,
       default:Date.now
    }
})
const faculty=mongoose.model("faculty",UserSchema);
export default faculty;