import express from 'express'
import Paper from '../models/Paper.js'
import multer from 'multer'
import notification from '../models/notification.js'
import mongoose from 'mongoose'
import { adminAuth } from '../middlewares/adminauth.js'
import uploadDir from '../config/uploads.js'
import path from 'path'
import fs from 'fs'

// Multer storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         return cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         return cb(null, `${Date.now()}+${file.originalname}`);
//     }
// });



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const paperFolder = path.join(uploadDir, 'papers'); // /tmp/uploads/syllabus
        if (!fs.existsSync(paperFolder)) {
            fs.mkdirSync(paperFolder, { recursive: true });
        }
        cb(null, paperFolder);
    }, 
    filename: (req, file, cb) => cb(null, `${Date.now()}+${file.originalname}`)
});
// export const upload = multer({ storage }).fields([
//   { name: 'file', maxCount: 1 },
//   { name: 'coverImage', maxCount: 1 }
// ]);

export const upload = multer({ storage });

// SAVE PAPERS 
export const papercontroller = async (req, res) => {
    try {
        const { title, department, subject, semester, year, description, course } = req.body;

        // Automatically take uploadedBy from authenticated user
        // Requires your auth middleware to set req.user
        const uploadedBy = req.user?.userId; 

        if (!uploadedBy) {
            return res.status(401).json({ error: 'Unauthorized: User ID missing' });
        }

        if (!req.file) {
            return res.status(400).json({ message: "File is required" });
        }

        const fileUrl = `/uploads/papers/${req.file.filename}`;

        // const resources = req.files
        //     ? req.files.map(f => ({
        //         filename: f.filename,
        //         fileType: f.mimetype,
        //         fileUrl: `/uploads/${f.filename}`
        //     }))
        //     : [];

        const newnote = new Paper({
            title,
            department,
            subject,
            semester,
            year,
            uploadedBy,
            description,
            fileUrl,
            course
        });

        const save = await newnote.save();
        return res.status(201).json(save);

    } catch (error) {
  console.error("Paper upload error:", error);
  res.status(500).json({ message: "Server Error", error: error.message });
}
};

//DELETE PAPERS 
export const deletepaper = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid paper ID' });
        }
        const deletedPaper = await Paper.findByIdAndDelete(id);
        if (!deletedPaper) {
            return res.status(404).json({ message: 'Paper not found' });
        }
        res.status(200).json({ message: 'Paper deleted successfully' });
    } catch (error) {
        console.error('Error deleting paper:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//  SEARCH PAPERS 
export const searchpaper = async (req, res) => {
  try {
    const { title, department, course, semester, subject } = req.query;

    const query = {};

    // Only apply $regex on string fields
    if (title) {
      query.title = { $regex: title, $options: "i" }; // case-insensitive search
    }

    // For ObjectId fields, use exact match
    if (department) query.department = department;
    if (course) query.course = course;
    if (semester) query.semester = semester;
    if (subject) query.subject = subject;

    const papers = await Paper.find(query)
      .populate("department course semester subject") // optional, populate related data
      .sort({ createdAt: -1 });

    res.status(200).json(papers);
  } catch (err) {
    console.error("Error searching papers:", err);
    res.status(500).json({ message: "Error searching papers", error: err.message });
  }
};
