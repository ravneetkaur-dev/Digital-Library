import express from 'express';
import { uploadedfile,upload} from '../controllers/bookcontroller.js';
// or configure `upload` here directly

const router = express.Router();
router.get('/upload', (req, res) => {
  res.render('upload', {
    action: '/book/upload',  // form action
    fields: ['title','author','subject','year'],
    fileField: 'profile'     // must match upload.single()
  });
});
// Multer middleware must precede handler
router.post('/upload', upload.single('profile'), uploadedfile);

export default router;
