import mongoose from 'mongoose';
const feedbackSchema=mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    userEmail:{
        type: String,
        required: true,
        match: /.+\@.+\..+/
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
const Feedback=mongoose.model("Feedback",feedbackSchema);
export default Feedback;