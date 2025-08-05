import express from "express";
import multer from "multer";
import { createAdmin,updateProfileImage} from "../controllers/manageAdmin.js";
import { loginAdmin } from "../controllers/addadmincontroller.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });
router.post("/login", loginAdmin);
router.post("/create", createAdmin);
router.put("/upload/images/:id", upload.single('profileImage'), updateProfileImage);
export default router;
