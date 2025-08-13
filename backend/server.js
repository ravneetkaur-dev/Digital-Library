import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import db from './config/db.js'; // Fixed
import facultyRouter from './routes/facultyrouter.js';
import path from 'path'; 
import admins from './routes/admin.js'
import feedbackRouter from './routes/feedbackrouter.js'; 
import syllabusRoutes from './routes/syllabusroute.js';
import facultyManagement from './routes/adminrouter.js'
import loginAdmin from './routes/loginadmin.js';
import book from './routes/book.js'; 
import notes from './routes/notes.js';
import notification from './routes/notification.js';
import course from './routes/courseRoute.js'; 
import subjects from './routes/subjects.js'; 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

db();
app.set('view engine', 'ejs');
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(express.json()); 
app.use('/api/admin', loginAdmin);
app.use('/api/createadmin', admins);
app.use('/api/faculty', facultyRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/facultymanagement', facultyManagement); 
app.use('/api/book', book); 
app.use('/api/notes', notes); 
app.use('/api/notification', notification);
app.use('/api/course', course); 
app.use('/api/subjects', subjects);
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
