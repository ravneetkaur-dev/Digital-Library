import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import db from './config/db.js'; // ✅ Fixed
import facultyRouter from './routes/facultyrouter.js';
import adminRouter from './routes/adminrouter.js';
// import cors from 'cors'; // Uncomment if using CORS
import feedbackRouter from './routes/feedbackrouter.js'; 
import syllabusRoutes from './routes/syllabusroute.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

db();

// app.use(cors()); // Uncomment if needed
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
