
import mongoose from 'mongoose';
const notesSchema = mongoose.Schema({
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
        type: Number,
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
    Course:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
    // available: {
    //     type: Boolean,
    //     default: true
    // },
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
    }],
    extraLinks:[{
        url:String,
        type:{
            type: String,
            enum: ['video', 'site'],
            required: true
        }
    }]
});
const notes=  mongoose.model("Notes", notesSchema);
export default notes