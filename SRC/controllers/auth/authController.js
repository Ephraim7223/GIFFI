import createHash from "crypto";
import User from "../../models/user.model.js";
import { signUpValidator, loginValidator } from "../../validators/auth.validators.js"

export const signUp = async (req, res) => {
    try {
        const {email, phoneNumber} = req.body
        const user = await User.findOne({$or:[{email},{phoneNumber}]})
        if (user) {
            res.status(409).json({message:'User already exists'})
        } else {
            const {
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                confirmPassword,
                gender,
                D_O_B,
                address,
            } = req.body

            if (password !== confirmPassword) {
                res.status(403).json({message:`${password} and ${confirmPassword} does not match, you stupid ${gender} use your sense`})
            }

            const newUser = new User ({
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                gender,
                D_O_B,
                address,
            })
            await newUser.save()
            res.status(201).json({message: 'user created successfully', newUser})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const logIn = async (req, res) => {}