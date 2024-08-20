import User from "../../models/user.model.js";
import { signUpValidator, loginValidator } from "../../validators/auth.validators.js"
import { formatZodError } from "../../utilities/error.js";
import { comparePasswords, generateRandomNumber, hashValue } from "../../utilities/hashValue.js";
import { generateToken } from "../../utilities/generateToken.js";
import { otpGeneration } from "../../templates/otp.js";

export const signUp = async (req, res) => {
    const signUpResults = signUpValidator.safeParse(req.body)
    if (!signUpResults.success) {
      return  res.status(400).json(formatZodError(signUpResults.error.issues))
    }
    try {
        const {email, phoneNumber} = req.body
        const user = await User.findOne({$or:[{email},{phoneNumber}]})
        if (user) {
            return res.status(409).json({message:'User already exists'})
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
                return res.status(403).json({message:`${password} and ${confirmPassword} does not match, you stupid ${gender} use your sense`})
            }

            const encryption = hashValue(password)

            const newUser = new User ({
                firstName,
                lastName,
                email,
                phoneNumber,
                password: encryption,
                gender,
                D_O_B,
                address,
            })
            await newUser.save()
            res.status(201).json({message: 'user created successfully', newUser})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
        console.error(error.message)
    }
}

export const logIn = async (req, res) => {
    const logInResults = loginValidator.safeParse(req.body)
    if (!logInResults.success) {
        return res.status(400).json(formatZodError(logInResults.error.issues))
    }
    try {
        const {email ,password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({message: `user with ${email} not found`})
        }
        const comparePw = comparePasswords(password, user.password)
        if (!comparePw) {
            return res.status(400).json({message: 'Password is incorrect, you THIEF !!!!'})
        }
        const accessToken = generateToken(user._id)
        res.status(200).json({message: `Welcome ${user.firstName} ${user.lastName}`, accessToken})
    } catch (error) {
        res.status(500).json({message: error.message})
        console.error(error.message)
    }
}

export const forgetPassword = async (req, res) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if (!user) {
            res.status(404).json({message:`user with: ${email} not found`, data: user, error: true})
        }
        const randomOtp = generateRandomNumber(2)
        user.otp = randomOtp;
        await  otpGeneration(user.email, user.otp)
        await user.save()
        res.status(200).json({message: 'otp sent successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

export const resetPassword = async (req, res) => {}
// check if the otp belongs to a user
// otp
// newPassword that will update the oldPassword
// email for success