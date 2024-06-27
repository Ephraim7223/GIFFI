import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fistName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    D_O_B: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male','Female']
    },
    loginID: {
        type: String,
        default: ' '
    }
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)
export default User;