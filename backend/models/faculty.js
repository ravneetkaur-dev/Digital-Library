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
    designation: {
        type: String,
        default: 'Faculty'
    },
    department: {
        type: String,
        default: 'General'
    },
    profilePicture: {
        type: String,
        default: 'default.jpg'
    },
    subjects: {
        type: [String],
        default: []
    },

})
const faculty=mongoose.model("faculty",UserSchema);
export default faculty;