import { createSubject, getAllSubjects, deleteSubject, updateSubject } from '../controllers/subject.js';
import express from 'express';
import { adminAuth } from '../middlewares/adminauth.js';
const router = express.Router();
router.post('/', adminAuth, createSubject);
router.get('/',getAllSubjects);
router.delete('/:id', adminAuth, deleteSubject);
router.put('/:id', adminAuth, updateSubject);
export default router;
