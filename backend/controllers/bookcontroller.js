import book from '../models/Book.js';
import multer from 'multer';
import mongoose from 'mongoose';
import uploadDir from '../config/uploads.js';
import path from 'path';
import fs from 'fs';

// Multer storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, `${Date.now()}+${file.originalname}`)
// });

// // Accept single 'file' and optional 'coverImage'
// export const upload = multer({ storage }).fields([
//   { name: 'file', maxCount: 1 },
//   { name: 'coverImage', maxCount: 1 }
// ]);



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const bookFolder = path.join(uploadDir, 'books'); // /tmp/uploads/syllabus
        if (!fs.existsSync(bookFolder)) {
            fs.mkdirSync(bookFolder, { recursive: true });
        }
        cb(null, bookFolder);
    }, 
    filename: (req, file, cb) => cb(null, `${Date.now()}+${file.originalname}`)
});
export const upload = multer({ storage }).fields([
  { name: 'file', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]);

export const uploadedfile = async (req, res) => {
  try {
    const uploadedBy = req.user?.userId;
    if (!uploadedBy) return res.status(401).json({ error: 'Unauthorized: User ID missing' });

    const { title, author, department, subject, semester, year, isbn, edition, pages, visibility, available, description, Course } = req.body;

    if (!req.files || !req.files.file) return res.status(400).send("No main file uploaded");

    const mainFile = req.files.file[0];
    const coverFile = req.files.coverImage ? req.files.coverImage[0] : undefined;
    console.log(mainFile, coverFile)

    const newBook = new book({
      title,
      author,
      department: new mongoose.Types.ObjectId(department),
      subject: new mongoose.Types.ObjectId(subject),
      semester: new mongoose.Types.ObjectId(semester),
      year,
      isbn: isbn || undefined,
      edition: edition || undefined,
      pages: pages ? Number(pages) : undefined,
      fileUrl: `/uploads/books/${mainFile.filename}`,
      coverImageUrl: coverFile ? `/uploads/books/${coverFile.filename}` : undefined,
      uploadedBy: new mongoose.Types.ObjectId(uploadedBy),
      visibility: visibility || "public",
      available: available !== undefined ? Boolean(available) : true,
      description: description || undefined,
      Course: new mongoose.Types.ObjectId(Course)
    });

    await newBook.save();
    res.status(201).json({ message: 'Book uploaded successfully', book: newBook });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send('Server error during file upload.');
  }
};

// 🔹 Populate all references
export const getAllBooks = async (req, res) => {
  try {
    const books = await book.find()
      .sort({ uploadedAt: -1 })
      .populate('uploadedBy', 'name email')
      .populate('subject', 'name')      // populate subject
      .populate('semester', 'name number') // populate semester
      .populate('department', 'name')   // populate department
      .populate('Course', 'name');      // populate course
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const filterAndSearchBooks = async (req, res) => {
  const { title, author, subject, year, semester } = req.query;
  const sanitize = (value) => value?.trim();
  const filter = {};

  if (title) filter.title = { $regex: sanitize(title), $options: 'i' };
  if (author) filter.author = { $regex: sanitize(author), $options: 'i' };
  if (subject) filter.subject = { $regex: sanitize(subject), $options: 'i' };
  if (year) filter.year = sanitize(year);
  if (semester) filter.semester = sanitize(semester);

  try {
    const books = await book.find(filter)
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'name email')
      .populate('subject', 'name')
      .populate('semester', 'name number')
      .populate('department', 'name')
      .populate('Course', 'name');
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid book ID' });

    const deletedBook = await book.findByIdAndDelete(id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
