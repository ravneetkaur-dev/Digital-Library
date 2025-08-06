import mongoose from 'mongoose'
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  department: {
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
  }
}, { timestamps: true })

const Course = mongoose.model('Course', courseSchema)
export default Course
