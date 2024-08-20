import express from "express";
import { forgetPassword, logIn, signUp } from "../../controllers/auth/authController.js";
const router = express.Router()

router.post('/sign-up', signUp)
router.post('/login', logIn)
router.post('/forget-password', forgetPassword)

export default router;