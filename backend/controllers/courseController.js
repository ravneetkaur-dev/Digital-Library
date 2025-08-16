import Department from '../models/department.js';
import Course from '../models/Course.js';
import Semester from '../models/Semester.js';
import mongoose from 'mongoose';


// ======================
// Add Department
// ======================
export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Department.findOne({ name: name.trim() });
    if (existing) return res.status(400).json({ message: "Department already exists" });

    const department = new Department({ name: name.trim() });
    await department.save();
    res.status(201).json(department);
  } catch (err) {
    res.status(500).json({ message: "Error creating department", error: err.message });
  }
};


// ======================
// Add Course under Department
// ======================
export const createCourse = async (req, res) => {
  try {
    const { name, departmentId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return res.status(400).json({ message: "Invalid department ID" });
    }

    const course = new Course({
      name: name.trim(),
      department: departmentId
    });

    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: "Error creating course", error: err.message });
  }
};


// ======================
// Add Semester under Course
// ======================
export const createSemester = async (req, res) => {
  try {
    const { number, courseId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const semester = new Semester({
      number: number.trim(),
      course: courseId
    });

    await semester.save();
    res.status(201).json(semester);
  } catch (err) {
    res.status(500).json({ message: "Error creating semester", error: err.message });
  }
};


// ======================
// Get All Departments
// ======================
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching departments", error: err.message });
  }
};


// ======================
// Get Courses by Department
// ======================
export const getCoursesByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return res.status(400).json({ message: "Invalid department ID" });
    }

    const courses = await Course.find({ department: departmentId }).sort({ name: 1 });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses", error: err.message });
  }
};


// ======================
// Get Semesters by Course
// ======================
export const getSemestersByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const semesters = await Semester.find({ course: courseId }).sort({ number: 1 });
    res.status(200).json(semesters);
  } catch (err) {
    res.status(500).json({ message: "Error fetching semesters", error: err.message });
  }
};
