import express from 'express';
import { addProduct } from '../../controllers/product/productsController.js';
import upload from '../../config/multer.js';
const router = express.Router()

router.post('/add', upload.single('image') ,addProduct)

export default router