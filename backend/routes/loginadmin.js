// import { loginAdmin } from "../controllers/addadmincontroller";
import { loginAdmin } from "../controllers/addadmincontroller.js";
import express from "express";
// import { adminAuth } from "../middlewares/adminauth.js";
const router = express.Router();
// Route for admin login
router.post("/login", loginAdmin);
export default router;