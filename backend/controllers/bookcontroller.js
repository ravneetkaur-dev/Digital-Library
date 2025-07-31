import { book } from '../models/index.js';
import multer from 'multer';
import {admin} from'../models/index.js'
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
     console.log("hklklk",data)
    //    console.log("datatttattata",rdata)
const roles = await User.find({}, 'role').lean();
console.log(roles);
//    const rol=await data.findOne({data.role=="admin"})
// console.log("req.data",req.data.User)
console.log(data.role)
   if(user.role=='admin'){
    console.log("req.user:", req.user);
  console.log("req.body:", req.body);

  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  
const {title,author,subject,year,}=req.body
try{
const f=req.file;

const user=new book({
    originalname: f.originalname,
    filename: f.filename,
    path: f.path,
    title: title,
    author: author,
    subject:subject,
    year:year,
    fileUrl: f.path,
      uploadedBy: req.user?._id
})

await user.save()
const file=f.path
console.log("filllllllllllllll",file)
    res.send('Upload complete!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error during file upload.');
  }
}
else{
    res.send("you are not admin so you donot upload")
}
}