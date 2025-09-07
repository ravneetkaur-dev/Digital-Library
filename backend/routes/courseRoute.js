import express from 'express';
import {
  createDepartment,
  createCourse,
  createSemester,
  getDepartments,
  getCoursesByDepartment,
  getSemestersByCourse,
  updateDepartment,
  updateCourse,
  updateSemester,
  deleteDepartment,
  deleteCourse,  
  deleteSemester
} from '../controllers/courseController.js';
import { adminAuth } from '../middlewares/adminauth.js';

const router = express.Router();

router.post('/departments',adminAuth, createDepartment);
router.post('/courses',adminAuth, createCourse);
router.post('/semesters',adminAuth, createSemester);

router.get('/departments', getDepartments);
router.get('/courses/:departmentId', getCoursesByDepartment);
router.get('/semesters/:courseId', getSemestersByCourse);

// Departments
router.put('/departments/:id', adminAuth, updateDepartment);
router.delete('/departments/:id', adminAuth, deleteDepartment);

// Courses
router.put('/courses/:id', adminAuth, updateCourse);
router.delete('/courses/:id', adminAuth, deleteCourse);

// Semesters
router.put('/semesters/:id', adminAuth, updateSemester);
router.delete('/semesters/:id', adminAuth, deleteSemester);

export default router;
