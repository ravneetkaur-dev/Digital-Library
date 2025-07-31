import express from 'express';
import { uploadedfile,upload} from '../controllers/bookcontroller.js';
// or configure `upload` here directly

const router = express.Router();

// Multer middleware must precede handler
router.post('/upload', upload.single('profile'), uploadedfile);

export default router;
