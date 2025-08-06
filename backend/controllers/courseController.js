import Course from '../models/Course.js'

export const createCourse = async (req, res) => {
  try {
    const { name, department, semester, year } = req.body

    const existing = await Course.findOne({ name, department, semester, year })
    if (existing) {
      return res.status(400).json({ error: 'Course already exists' })
    }

    const newCourse = new Course({ name, department, semester, year })
    const saved = await newCourse.save()
    return res.status(201).json(saved)
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message })
  }
}

export const getAllCourses = async (req, res) => {
  try {
    const all = await Course.find()
    res.json(all)
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message })
  }
}
