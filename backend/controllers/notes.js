import express from 'express'
import notes from '../models/Notes.js'
import multer from 'multer'
import notification from '../models/notification.js'
import mongoose from 'mongoose'
import uploadDir from '../config/uploads.js'
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,uploadDir);
    },
    filename: function (req,file,cb){
         return cb(null,`${Date.now()}+${file.originalname}`)
    }
})
export const upload=multer({storage})
export const note = async (req, res) => {
  try {
    const { title, subject, semester, year, uploadedBy, description } = req.body;

    // Parse extra links properly
    const extraLinks = req.body.extraLinks 
      ? Array.isArray(req.body.extraLinks) 
        ? req.body.extraLinks 
        : [req.body.extraLinks] 
      : [];

    const parsedLinks = extraLinks.map((link, i) => ({
      url: req.body[`extraLinks[${i}][url]`] || link.url,
      type: req.body[`extraLinks[${i}][type]`] || link.type
    }));

    // Handle files
    const resources = req.files
      ? req.files.map(f => ({
          filename: f.filename,
          fileType: f.mimetype,
          fileUrl: `/uploads/${f.filename}`
        }))
      : [];

    // Save note
    const newnote = new notes({
      title,
      subject,
      semester,
      year,
      uploadedBy, // keep raw, just string/ObjectId
      description,
      resources,
      extraLinks: parsedLinks
    });

    const save = await newnote.save();

    // Save notification
    const newnotification = new notification({
      message: `New note uploaded by teacher ${uploadedBy} for subject ${subject}`,
      noteId: save._id,
      uploadedBy: mongoose.isValidObjectId(uploadedBy)
        ? new mongoose.Types.ObjectId(uploadedBy)
        : null,
      subject: save.subject
    });

    await newnotification.save();

    return res.status(201).json(save);
  } catch (err) {
    console.error("Error in note controller:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const allNotes = await notes
      .find()
      .populate("uploadedBy", "name email") // optional: include faculty info
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(allNotes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};