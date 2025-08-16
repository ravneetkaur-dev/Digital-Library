import express from 'express';
import {  updateFaculty } from '../controllers/facultyManagmentController.js';
import { registerUser,deleteFaculty,getFaculty } from '../controllers/facultyManagmentController.js';
// import { adminAuth } from '../middlewares/adminauth.js';
const router = express.Router();
router.post('/register', registerUser);
router.put('/update/:id', updateFaculty);
router.delete('/delete/:id', deleteFaculty);
router.get('/getfaculty', getFaculty);
export default router;
// import express from 'express';
// import {
//   registerUser,
//   updateFaculty,
//   deleteFaculty,
//   getFaculty
// } from '../controllers/facultyManagmentController.js';

// import { adminAuth } from '../middlewares/adminauth.js'; // ✅ Import the middleware

// const router = express.Router();

// // ✅ Apply adminAuth to all admin-only routes
// router.post('/register', adminAuth, registerUser);
// router.put('/update/:id', adminAuth, updateFaculty);
// router.delete('/deletes/:id', adminAuth, deleteFaculty);
// router.get('/getfaculty', adminAuth, getFaculty);

// export default router;
