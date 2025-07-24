import express from 'express';
import{ submitFeedback, getAllFeedback } from '../controllers/feedback.js';
const router = express.Router();
router.post('/submit', submitFeedback);
router.get('/all', getAllFeedback);
export default router;