import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
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
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
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
    },
    role: {
        type: String,
        default: 'user'
    }
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)
export default User;