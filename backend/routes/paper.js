import express from 'express'
import { upload,papercontroller,deletepaper,searchpaper } from '../controllers/paper.js'
import { adminAuth } from '../middlewares/adminauth.js'
import router from './book.js'
    router.post('/',adminAuth, upload.array('resources', 5), papercontroller)
    router.delete('/:id', deletepaper);
    router.get('/',searchpaper)
export default router