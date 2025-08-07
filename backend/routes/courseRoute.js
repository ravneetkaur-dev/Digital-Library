import express from 'express';
import {
  createDepartment,
  createCourse,
  createSemester,
  getDepartments,
  getCoursesByDepartment,
  getSemestersByCourse
} from '../controllers/courseController.js';
import { adminAuth } from '../middlewares/adminauth.js';

const router = express.Router();

router.post('/departments',adminAuth, createDepartment);
router.post('/courses',adminAuth, createCourse);
router.post('/semesters',adminAuth, createSemester);

router.get('/departments', getDepartments);
router.get('/courses/:departmentId', getCoursesByDepartment);
router.get('/semesters/:courseId', getSemestersByCourse);

export default router;
