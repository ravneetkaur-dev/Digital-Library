import express from 'express'
import { createCourse, getAllCourses } from '../controllers/courseController.js'
import {adminAuth} from '../middlewares/adminauth.js'
const router = express.Router()

router.post('/add', adminAuth, createCourse)       // Admin can add course
router.get('/all', getAllCourses)       // Anyone can fetch all

export default router
