import express from 'express';
import {  updateFaculty } from '../controllers/admincontroller.js';
import { registerUser,deleteFaculty,getFaculty } from '../controllers/admincontroller.js';
import { adminAuth } from '../middlewares/adminauth.js';
const router = express.Router();

router.post('/register', registerUser);
router.put('/update/:id', updateFaculty);
router.delete('/delete/:id', deleteFaculty);
router.get('/getfaculty', getFaculty);
export default router;
