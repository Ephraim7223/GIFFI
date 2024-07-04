import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: {

    },
    description: {

    },
    price: {

    },
    quantity: {

    },
    status: {

    },
    discount: {

    },
    image: {

    },
    review: {

    }
},{
    timestamps: true
})

const Product = mongoose.model('Product', productsSchema)
export default Product;