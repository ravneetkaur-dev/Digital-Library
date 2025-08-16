import express from 'express'
import notes from '../models/Notes.js'
import multer from 'multer'
import notification from '../models/notification.js'
import mongoose from 'mongoose'
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./uploads');
    },
    filename: function (req,file,cb){
         return cb(null,`${Date.now()}+${file.originalname}`)
    }
})
export const upload=multer({storage})
export const note=async(req,res)=>{
    try{
const { title, subject, semester, year, uploadedBy, description } = req.body
const extraLinks = req.body.extraLinks 
  ? Array.isArray(req.body.extraLinks) 
    ? req.body.extraLinks 
    : [req.body.extraLinks] 
  : [];

const parsedLinks = extraLinks.map((_, i) => ({
  url: req.body[`extraLinks[${i}][url]`],
  type: req.body[`extraLinks[${i}][type]`]
}));
const resources = req.files
      ? req.files.map(f => ({
          filename: f.filename,
          fileType: f.mimetype,
          fileUrl: `/uploads/${f.filename}`
        }))
      : []
      const newnote=new notes({
        title,subject,semester,year,uploadedBy,description,resources,extraLinks
      })

      const save=await newnote.save()
      //================>>>>>>>create notification===========>>>>>>>>>.
      //================>>>>>>____________________===========>>>>>>>>>.
      const newnotification = new notification({
       message: `New note uploaded by teacher ${uploadedBy} for subject ${subject}`,
            noteId: save._id,
            uploadedBy:  new mongoose.Types.ObjectId(uploadedBy),
            subject: save.subject
    });
// const io = req.app.get('io');
//     io.emit('new_note_uploaded', notification);
    await newnotification.save();
       return res.status(201).json(save)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error', details: err.message })
  }
}
