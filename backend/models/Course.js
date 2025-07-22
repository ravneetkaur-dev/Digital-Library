const mongoose = require('mongoose');
const courseSchema=mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
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
    tags: [String],
    resources: [{
    filename: String,
    fileType: String,
    fileUrl: String
  }]
});
Medule.exports=mongoose.model("Course",courseSchema);
