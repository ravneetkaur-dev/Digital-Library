import express from 'express';
const router = express.Router();
import { login, logout,updateProfileImage,upload} from '../controllers/facultycontroller.js';

router.post('/login', login);
router.post('/logout', logout);
router.put("/update/facultyimages/:id", upload.single('profileImage'), updateProfileImage);
export default router;