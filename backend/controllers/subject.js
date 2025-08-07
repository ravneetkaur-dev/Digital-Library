import subjects from "../models/subjects.js";
import mongoose from "mongoose";

// ✅ CREATE SUBJECT
export const createSubject = async (req, res) => {
    const { name, code, department, course, semester, description } = req.body;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(department)) {
        return res.status(400).json({ message: "Invalid department ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(course)) {
        return res.status(400).json({ message: "Invalid course ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(semester)) {
        return res.status(400).json({ message: "Invalid semester ID" });
    }

    try {
        const newSubject = new subjects({
            name: name.trim(),
            code: code.trim(),
            department,
            course,
            semester,
            description
        });

        await newSubject.save();
        res.status(201).json(newSubject);
    } catch (err) {
        res.status(500).json({ message: "Error creating subject", error: err.message });
    }
};

// ✅ GET ALL SUBJECTS
export const getAllSubjects = async (req, res) => {
    try {
        const subjectsList = await subjects
            .find()
            .populate('department', 'name')
            .populate('course', 'name')
            .populate('semester', 'number');

        res.status(200).json(subjectsList);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ✅ DELETE SUBJECT
export const deleteSubject = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid subject ID' });
        }

        const subject = await subjects.findByIdAndDelete(id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        res.status(200).json({ message: 'Subject deleted successfully' });
    } catch (error) {
        console.error('Error deleting subject:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ✅ UPDATE SUBJECT
export const updateSubject = async (req, res) => {
    const { id } = req.params;
    const { name, code, department, course, semester, description } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid subject ID' });
        }

        const updatedSubject = await subjects.findByIdAndUpdate(
            id,
            { name, code, department, course, semester, description },
            { new: true }
        );

        if (!updatedSubject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        res.status(200).json(updatedSubject);
    } catch (error) {
        console.error('Error updating subject:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
