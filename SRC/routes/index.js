import express from 'express'
import authRoutes from '../routes/auth/auth.routes.js'
import productRoutes from '../routes/products/product.routes.js'
const router = express.Router()

router.use('/auth', authRoutes)
router.use('/product', productRoutes)

export default router