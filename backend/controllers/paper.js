import express from 'express'
import paper from '../models/Paper.js'
import multer from 'multer'
import notification from '../models/notification.js'
import mongoose from 'mongoose'
import { adminAuth } from '../middlewares/adminauth.js'
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./uploads');
    },
    filename: function (req,file,cb){
         return cb(null,`${Date.now()}+${file.originalname}`)
    }
})
export const upload=multer({storage})
export const papercontroller=async(req,res)=>{
    //=========|   SAVE PAPERS 👍 |========//
   //==========|   SAVE PAPERS 👍 |========//
    try{
const { title, subject, semester, year, uploadedBy, description,course} = req.body

const resources = req.files
      ? req.files.map(f => ({
          filename: f.filename,
          fileType: f.mimetype,
          fileUrl: `/uploads/${f.filename}`
        }))
      : []
      const newnote=new paper({
        title,subject,semester,year,uploadedBy,description,resources,course
      })

      const save=await newnote.save()
     
       return res.status(201).json(save)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error', details: err.message })
  }
}
  //=========|  DELETE PAPERS❌ |==========//
  //=========|  DELETE PAPERS❌ |==========//
    export const deletepaper = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    const deletedBook = await paper.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal server error' }); 
  }
};
 //=========|  SEARCH PAPERS🍳 |==========//
 //=========|  SEARCH PAPERS🍳 |==========//
//  export const searchpaper=async(req,res)=>{
//     let data = await paper.find({
//         $or:[
//             {"title":{$regex:req.params.key, $options: 'i'}}, 
//              {"semester":{$regex:req.params.key, $options: 'i'}},
//               {"subject":{$regex:req.params.key, $options: 'i'}},
//             {"uploadedBy":{$regex:req.params.key, $options: 'i'}},
//            {"discription":{$regex:req.params.key, $options: 'i'}},
//             {"year":{$regex:req.params.key, $options: 'i'}},
//         ]
//     })
//     res.send(data)
//  }
  export const searchpaper = async (req, res) => {
  try {
    const { key = '' } = req.query;
    const regex = new RegExp(key, 'i');

    const filter = {
      $or: [
        { title: { $regex: regex } },
        { subject: { $regex: regex } },
        { semester: { $regex: regex } },
        { description: { $regex: regex } }, // Fixed field name
      ]
    };

    // Only match number fields if key is numeric
    const num = Number(key);
    if (!isNaN(num)) {
      filter.$or.push({ year: num });
    }

const results = await paper.find(filter).select('title subject year semester description uploadedBy course');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
};



