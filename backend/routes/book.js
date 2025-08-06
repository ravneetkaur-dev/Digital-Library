import express from 'express';
<<<<<<< HEAD
import { uploadedfile, upload } from '../controllers/bookcontroller.js';

const router = express.Router();

// Optional: Remove this route if you're not serving a page
router.get('/upload', (req, res) => {
  res.json({
    message: 'Use POST /api/book/upload with a file field named "profile"'
  });
});

// Upload route
=======
import { uploadedfile,upload} from '../controllers/bookcontroller.js';
// or configure `upload` here directly

const router = express.Router();

// Multer middleware must precede handler
>>>>>>> ed2e5468380bfa1c046ca61721621d2f52376da9
router.post('/upload', upload.single('profile'), uploadedfile);

export default router;
