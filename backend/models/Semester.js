const mongoose = require('mongoose');
const semesterSchema = mongoose.Schema({
  number: {
    type: Number, 
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  subjects: [{
    type: String
  }],
});
const semester=mongoose.model("Semester", semesterSchema);

module.exports = semester 