const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
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
        canUpdate:{type:boolean,default:false},
        canEdit:{type:boolean,default:false},
        canDelete:{type:boolean,default:false},
        canManageFaculty:{type:boolean,default:false},
    },
    createdAt:{
       date:{type:Date},
       default:Date.now
    }
})
module.exports=mongoose.model("User",UserSchema);