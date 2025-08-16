import express from 'express'
import { upload, note } from '../controllers/notes.js'
const router = express.Router()

// POST /api/notes — multipart/form-data में files handle करता है
router.post('/', upload.array('resources', 5), note)

export default router
