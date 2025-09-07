import express from 'express'
import { upload, getNotes, note } from '../controllers/notes.js'
const router = express.Router()

router.post('/', upload.array('resources', 5), note)
router.get("/", getNotes);

export default router
