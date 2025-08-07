import book from '../models/Book.js';
import multer from 'multer';
import {admin} from'../models/index.js'
import mongoose from 'mongoose';
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./uploads");
    },
    filename: function (req,file,cb){
        return cb(null,`${Date.now()}+${file.originalname}`)
    }
})
export const upload=multer({storage})
const data=admin

export const uploadedfile=async(req,res)=>{
     const rdata=data.role;
    
  
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  
const {title,author,subject,year,semester}=req.body
try{
const f=req.file;
console.log(req.body)
const user=new book({
    originalname: f.originalname,
    filename: f.filename,
    path: f.path,
    title: title,
    author: author,
    subject:subject,
    semester:semester,
    year:year,
    fileUrl: f.path,
      uploadedBy:new mongoose.Types.ObjectId(req.body.uploadedBy),
})

await user.save()
const file=f.path

    res.send('Upload complete!');
  } catch (err) {
   console.error("Upload error:", err);
    res.status(500).send('Server error during file upload.');
  }
}
export const filterAndSearchBooks = async (req, res) => {
  const { title, author, subject, year, semester } = req.query;

  const sanitize = (value) => value?.trim(); // Remove extra spaces
  const filter = {}; // ✅ define first

  // ✅ Apply filters only if provided
  if (title) filter.title = { $regex: sanitize(title), $options: 'i' };
  if (author) filter.author = { $regex: sanitize(author), $options: 'i' };
  if (subject) filter.subject = { $regex: sanitize(subject), $options: 'i' };
  if (year) filter.year = sanitize(year);
  if (semester) filter.semester = sanitize(semester);

  try {
    const books = await book.find(filter)
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'name email'); // optional: if you want uploader info

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getAllBooks = async (req, res) => {
  try {
    const books = await book.find().sort({ uploadedAt: -1 }).populate('uploadedBy', 'name email');
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    const deletedBook = await book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal server error' }); 
  }
};