const mongoose = require('mongoose');
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
    }]
});
const notes=  mongoose.model("Notes", notesSchema);
module.exports = notes