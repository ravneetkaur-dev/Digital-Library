import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import db from './config/db.js';
import facultyRouter from './routes/facultyrouter.js';
import adminRouter from './routes/adminrouter.js';
import path from 'path'; 
import cors from 'cors'; 
import feedbackRouter from './routes/feedbackrouter.js'; 
import syllabusRoutes from './routes/syllabusroute.js';
import loginAdmin from './routes/loginadmin.js'; 
// import { createAdmin } from './controllers/admin_faculty.js';
import book from './routes/book.js'; // Import book routes
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

db();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.set('view engine', 'ejs');
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(express.json()); 
app.use('/api/faculty', facultyRouter);
app.use('/api/admin', adminRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/loginadmin', loginAdmin); 

// createAdmin();

app.use('/api/book', book); // Use book routes
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
