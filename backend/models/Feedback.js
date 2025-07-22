const mongoose=require('mongoose');
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
    // courseId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Course',
    //     required: true
    // },
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
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
});
module.exports=mongoose.model("Feedback",feedbackSchema);