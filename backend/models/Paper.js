import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    department: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    course: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    semester: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: true
    },
    subject: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
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

const Paper = mongoose.model("Paper", paperSchema);
export default Paper;
