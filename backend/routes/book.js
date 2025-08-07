import express from 'express';
import { uploadedfile, upload } from '../controllers/bookcontroller.js';

const router = express.Router();

// Optional: Remove this route if you're not serving a page
router.get('/upload', (req, res) => {
  res.json({
    message: 'Use POST /api/book/upload with a file field named "profile"'
  });
});

// Upload route
router.post('/upload', upload.single('profile'), uploadedfile);

export default router;
