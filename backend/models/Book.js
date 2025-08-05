import mongoose from 'mongoose';
const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
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
        required: true,
        match: /^\d{4}$/ // Ensures the year is a 4-digit number
    },
    isbn: {
        type: String,
        unique: true,
        sparse: true
    },
    edition: {
        type: String
    },
    pages: {
        type: Number
    },
    fileUrl: {
        type: String,
        required: true
    },
    coverImageUrl: {
        type: String
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
    }
});
const book = mongoose.model("Book", BookSchema);
export default book;
