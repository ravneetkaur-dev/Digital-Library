import express from 'express';
const router=express.Router()
import { createAdmin } from '../controllers/admin_faculty.js';
router.post('/add',createAdmin)
export default router
