import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
