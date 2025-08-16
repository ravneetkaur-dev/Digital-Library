
import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
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
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });
export default mongoose.model('Subject', subjectSchema);
