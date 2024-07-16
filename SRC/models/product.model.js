import mongoose from "mongoose";
import { status } from "./enums.js";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        default: ''
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: status,
        required :true
    },
    image: [{
        type: String,
        required: true
    }],
    review: [{
        type: String,
        user: {
            userId: mongoose.Types.ObjectId,
            ref: 'User'
        }
    }],
    rating: [{
        type: Number,
        min: [1],
        max: [5],
        user: {
            userId: mongoose.Types.ObjectId,
            ref: 'User'
        }
    }]
},{
    timestamps: true
})

const Product = mongoose.model('Product', productsSchema)
export default Product;