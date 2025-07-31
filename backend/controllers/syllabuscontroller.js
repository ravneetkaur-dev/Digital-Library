import syllabusmodel from '../models/Syllabus.js';
import express from 'express';
import multer from 'multer';
const upload = multer({ dest: 'uploads/syllabus/' });

export const syllabus=async(req,res)=>{
    try{
        const {title, description, subject, semester, year, createdBy} = req.body;
        if(!req.file){
            return res.status(400).json({message: "File is required"});
            }
        const fileUrl=`/uploads/syllabus/${req.file.filename}`;
            const newSyllabus=new syllabusmodel({
            title,
            description,
            subject,
            semester,
            year,
            createdBy,
            fileUrl
        });
        const savedSyllabus=await newSyllabus.save();
        return res.status(201).json(savedSyllabus);
    }
catch(error){
        console.error("Error in syllabus controller:", error);
        res.status(500).json({message: "Internal server error"});
}
}
    export const getSyllabus=async(req,res)=>{
        try{
            const syllabusList=await syllabusmodel.find()
            return res.status(200).json(syllabusList);
        }
        catch(error){
            console.error("Error fetching syllabus:", error);
            res.status(500).json({message: "Internal server error"});
        }}
        export const getSyllabusById=async(req,res)=>{
            try{
                const syllabusId=req.params.id;
                const syllabusItem=await syllabusmodel.findById(syllabusId);
                if(!syllabusItem){
                    return res.status(404).json({message: "Syllabus not found"});
                }
                return res.status(200).json(syllabusItem);
            }
            catch(error){
                console.error("Error fetching syllabus by ID:", error);
                res.status(500).json({message: "Internal server error"});
            }
    }
    export const  deleteSyllabus=async(req,res)=>{
        try{
            const syllabusId=req.params.id;
            const deletedSyllabus=await syllabusmodel.findByIdAndDelete(syllabusId);
            if(!deletedSyllabus){
                return res.status(404).json({message: "Syllabus not found"});
            }
            return res.status(200).json({message: "Syllabus deleted successfully"});
        }
        catch(error){
            console.error("Error deleting syllabus:", error);
            res.status(500).json({message: "Internal server error"});
        }
    }