import express from 'express';
import {  updateFaculty } from '../controllers/facultyManagmentController.js';
import { registerUser,deleteFaculty,getFaculty } from '../controllers/facultyManagmentController.js';
const router = express.Router();
router.post('/register', registerUser);
router.put('/update/:id', updateFaculty);
router.delete('/deletes/:id', deleteFaculty);
router.get('/getfaculty', getFaculty);
export default router;
