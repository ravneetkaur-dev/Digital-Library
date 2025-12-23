import syllabusmodel from '../models/Syllabus.js';
import multer from 'multer';
import mongoose from 'mongoose';
import uploadDir from '../config/uploads.js';
import path from 'path'
import fs from 'fs'

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const syllabusFolder = path.join(uploadDir, 'syllabus'); // /tmp/uploads/syllabus
        if (!fs.existsSync(syllabusFolder)) {
            fs.mkdirSync(syllabusFolder,{ recursive: true });
        } 
        cb(null, syllabusFolder);
    },
    filename: (req, file, cb) => cb(null, `${Date.now()}+${file.originalname}`)
});
export const upload = multer({ storage });

// Upload new syllabus
export const syllabus = async (req, res) => {
    try {
        const { title, description, subject, semester, year, Course, department, visibility } = req.body;
        const createdBy = req.user?.userId;

        if (!createdBy) {
            return res.status(401).json({ error: 'Unauthorized: User ID missing' });
        }

        if (!title || !subject || !semester || !year || !Course || !department) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "File is required" });
        }

        const fileUrl = `/uploads/syllabus/${req.file.filename}`;

        const newSyllabus = new syllabusmodel({
            title,
            description: description || undefined,
            subject: new mongoose.Types.ObjectId(subject),
            semester: new mongoose.Types.ObjectId(semester),
            year: Number(year),
            Course: new mongoose.Types.ObjectId(Course),
            department: new mongoose.Types.ObjectId(department),
            createdBy: new mongoose.Types.ObjectId(createdBy),
            fileUrl,
            visibility: visibility || "public"
        });

        const savedSyllabus = await newSyllabus.save();
        return res.status(201).json(savedSyllabus);

    } catch (error) {
        console.error("Error in syllabus controller:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

// Get all syllabus
export const getSyllabus = async (req, res) => {
    try {
        const syllabusList = await syllabusmodel.find()
            .populate('subject', 'name')
            .populate('semester', 'number')
            .populate('Course', 'name')
            .populate('department', 'name')
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });
        return res.status(200).json(syllabusList);
    } catch (error) {
        console.error("Error fetching syllabus:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get syllabus by ID
export const getSyllabusById = async (req, res) => {
    try {
        const syllabusId = req.params.id;
        const syllabusItem = await syllabusmodel.findById(syllabusId)
            .populate('subject', 'name')
            .populate('semester', 'number')
            .populate('Course', 'name')
            .populate('department', 'name')
            .populate('createdBy', 'name email');

        if (!syllabusItem) {
            return res.status(404).json({ message: "Syllabus not found" });
        }

        return res.status(200).json(syllabusItem);
    } catch (error) {
        console.error("Error fetching syllabus by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete syllabus
export const deleteSyllabus = async (req, res) => {
    try {
        const syllabusId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(syllabusId)) {
            return res.status(400).json({ message: "Invalid syllabus ID" });
        }

        const deletedSyllabus = await syllabusmodel.findByIdAndDelete(syllabusId);
        if (!deletedSyllabus) {
            return res.status(404).json({ message: "Syllabus not found" });
        }

        return res.status(200).json({ message: "Syllabus deleted successfully" });
    } catch (error) {
        console.error("Error deleting syllabus:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
