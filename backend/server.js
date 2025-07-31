import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import db from './config/db.js'; // ✅ Fixed
import facultyRouter from './routes/facultyrouter.js';
import adminRouter from './routes/adminrouter.js';
// import cors from 'cors'; // Uncomment if using CORS
import admins from './routes/admin.js'
import feedbackRouter from './routes/feedbackrouter.js'; 
import book from './routes/book.js';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

db();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// add:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(cors()); // Uncomment if needed
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
