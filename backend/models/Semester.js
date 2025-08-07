import mongoose from 'mongoose';

const semesterSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Semester', semesterSchema);
