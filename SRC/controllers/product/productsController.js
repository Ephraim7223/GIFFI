import { cloudinaryMediaUpload } from "../../config/cloudinary.js"
import Product from "../../models/product.model.js"
import { formatZodError } from "../../utilities/error.js"
import { addProductValidator } from "../../validators/product.validator.js"
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const addProduct = async (req, res) => {
    const addProductResults = addProductValidator.safeParse(req.body)
    if (!addProductResults.success) {
        return res.status(400).json(formatZodError(addProductResults.error.issues))
    }
    try {
        const {name, description, price, status, quantity} = req.body
        let image = req.file
        const product = await Product.findOne({name})
        if (product) {
           return res.status(409).json({message: `Product with name: ${name} already exists`})
        }
        if (!image || image.length === 0) {
          return  res.status(404).json({message: 'At least one image is required'})
        }
        const uploadedImages = await cloudinaryMediaUpload(req.file.path, 'products')
        image = uploadedImages.url

        const newProduct = new Product ({
            name,
            description,
            price,
            image,
            quantity,
            status,
        })
        await newProduct.save()
        console.log('Product Saved successfully', newProduct);
        res.status(200).json({message: 'Product Saved successfully', newProduct})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}
export const getSingleProduct = async (req, res) => {
    try {
        const products = await Product.findById({id: req.params.id})
        if (!products) {
            res.status(404).json({message: 'No products found'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error);
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        if (!products) {
            res.status(404).json({message: 'No products found'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById({id: req.params.id})
        if (!product) {
            res.status(404).json({message: 'No products found'})
        }
        if (product.image) {
            const imageId = product.image.split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(imageId)
        }
        await Product.findByIdAndDelete(product)
        res.status(200).json({message: 'Product deleted successfully', data: product, error: null})
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error);
    }
}

export const updateProduct = async (req, res) => {}
