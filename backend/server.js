import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import db from './config/db.js';
import facultyRouter from './routes/facultyrouter.js';
//import adminRouter from './routes/adminrouter.js';
import path from 'path'; 
import cors from 'cors'; 
import loginAdmin from './routes/loginadmin.js'; 
import admin from './routes/admin.js'
import feedbackRouter from './routes/feedbackrouter.js'; 
import syllabusRoutes from './routes/syllabusroute.js';
import facultyManagement from './routes/adminrouter.js'
import paper from './routes/paper.js'
import book from './routes/book.js'; // Import book routes
import notes from './routes/notes.js';
import notification from './routes/notification.js';
import course from './routes/courseRoute.js'; // Import course routes
import subjects from './routes/subjects.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

db();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.set('view engine', 'ejs');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); 
app.use('/api/faculty', facultyRouter);
//app.use('/api/admin', adminRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/paper',paper)
app.use('/api/loginadmin', loginAdmin); 

// createAdmin();

// app.use('/api', loginAdmin); // Use the login route
app.use('/api/facultymanagement', facultyManagement); // Use faculty management routes
// app.use(cors()); // Uncomment if needed
app.use('/api/book', book); // Use book routes
app.use('/api/notes', notes); // Uncomment if using notes routes
app.use('/api/notification', notification); // Use notification routes
app.use('/api/course', course); // Use course routes
app.use('/api/subjects', subjects);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
