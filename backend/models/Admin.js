import mongoose from 'mongoose';
// import { Boolean } from 'webidl-conversions';
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
    },
    profileImage: {
        type: String,
        default: "backend/utils/images/images.jpeg"
    },
})
const admin=mongoose.model("User",UserSchema);
export default admin;