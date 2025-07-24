import express from 'express';
const router = express.Router();
import { login, logout } from '../controllers/facultycontroller.js';

router.post('/login', login);
router.post('/logout', logout);
export default router;