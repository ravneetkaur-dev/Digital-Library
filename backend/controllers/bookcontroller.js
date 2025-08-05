import book from '../models/Book.js';
import multer from 'multer';
import {admin} from'../models/index.js'
import mongoose from 'mongoose';
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./uploads");
    },
    filename: function (req,file,cb){
        return cb(null,`${Date.now()}+${file.originalname}`)
    }
})
export const upload=multer({storage})
const data=admin

export const uploadedfile=async(req,res)=>{
     const rdata=data.role;
    
  
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  
const {title,author,subject,year,semester}=req.body
try{
const f=req.file;
console.log(req.body)
const user=new book({
    originalname: f.originalname,
    filename: f.filename,
    path: f.path,
    title: title,
    author: author,
    subject:subject,
    semester:semester,
    year:year,
    fileUrl: f.path,
      uploadedBy:new mongoose.Types.ObjectId(req.body.uploadedBy),
})

await user.save()
const file=f.path

    res.send('Upload complete!');
  } catch (err) {
   console.error("🔴 Upload error:", err);
    res.status(500).send('Server error during file upload.');
  }
}
