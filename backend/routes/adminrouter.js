import express from 'express';
import { registerUser, updateFaculty, deleteFaculty, getFaculty } from '../controllers/facultyManagmentController.js';
import multer from 'multer';

const router = express.Router();

// Multer config for profile image
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/facultyimages'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/register', upload.single('profileImage'), registerUser);
router.put('/update/:id', upload.single('profileImage'), updateFaculty);
router.delete('/delete/:id', deleteFaculty);
router.get('/getfaculty', getFaculty);

export default router;
