import express from 'express';
import { updateFaculty } from '../controllers/admincontroller.js';
import { registerUser,deleteFaculty } from '../controllers/admincontroller.js';
const router = express.Router();

router.post('/register', registerUser);
router.put('/update/:id', updateFaculty);
router.delete('/deletes/:id', deleteFaculty)
export default router;