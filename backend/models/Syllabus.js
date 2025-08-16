import mongoose from "mongoose";

const SyllabusSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false 
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    semester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    Course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    department: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    fileUrl: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        enum: ['public', 'faculty-only', 'students'],
        default: 'public'
    }
});

const Syllabus = mongoose.model("Syllabus", SyllabusSchema);

export default Syllabus;
