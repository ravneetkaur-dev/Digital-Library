import express from 'express';
import { updateFaculty } from '../controllers/admincontroller.js';
import { registeruser } from '../controllers/admincontroller.js';
const router = express.Router();

router.post('/register', registeruser);
router.put('/update/:id', updateFaculty);
export default router;