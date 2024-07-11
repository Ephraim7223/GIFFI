import { cloudinaryMediaUpload } from "../../config/cloudinary.js"
import Product from "../../models/product.model.js"
import { addProductValidator } from "../../validators/product.validator.js"


export const addProduct = async (req, res) => {
    const addProductResults = addProductValidator.safeParse(req.body)
    if (!addProductResults.success) {
        return res.status(400).json(formatZodError(addProductResults.error.issues))
    }
    try {
        const {name, description, price, status, quantity} = req.body
        const files = req.files
        const product = await Product.findOne({name})
        if (product) {
           return res.status(409).json({message: `Product with name: ${name} already exists`})
        }
        if (!files || files.length === 0) {
          return  res.status(404).json({message: 'At least one image is required'})
        }
        const uploadedImages = await Promise.all(files.map(async (file) => {
            const result = await cloudinaryMediaUpload(file.path, 'image')
            return result.url
        }))

        const newProduct = new Product ({
            name,
            description,
            price,
            image: uploadedImages,
            quantity,
            status,
        })
        await newProduct.save()
        res.status(200).json({message: 'Product Saved successfully'})
    } catch (error) {
        
    }
}
export const getSingleProduct = async (req, res) => {}
export const getAllProducts = async (req, res) => {}
export const deleteProduct = async (req, res) => {}
export const updateProduct = async (req, res) => {}
