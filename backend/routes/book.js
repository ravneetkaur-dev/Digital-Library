import express from 'express';
import { uploadedfile, upload } from '../controllers/bookcontroller.js';
import { getAllBooks,deleteBook,filterAndSearchBooks } from '../controllers/bookcontroller.js';
import { adminAuth } from '../middlewares/adminauth.js';
const router = express.Router();
router.get('/upload',adminAuth, (req, res) => {
  res.json({
    message: 'Use POST /api/book/upload with a file field named "profile"'
  });
});
router.post('/upload', adminAuth, upload, uploadedfile);
router.get('/all',adminAuth, getAllBooks);
router.delete('/delete/:id',adminAuth, deleteBook);
router.get('/filter', filterAndSearchBooks);
router.get('/search', filterAndSearchBooks);


export default router;