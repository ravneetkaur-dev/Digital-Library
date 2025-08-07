import mongoose from "mongoose";
const paperSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    visibility: {
        type: String,
        enum: ["public", "faculty-only", "students"],
        default: "public"
    },
    available: {
        type: Boolean,
        default: true
    },
    course:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
    description: {
        type: String
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    resources: [{
        filename: String,
        fileType: String,
        fileUrl: String
    }]
});
const paper= mongoose.model("Paper", paperSchema);
 export default paper