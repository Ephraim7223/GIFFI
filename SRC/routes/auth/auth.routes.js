import express from "express";
import { logIn, signUp } from "../../controllers/auth/authController.js";
const router = express.Router()

router.post('/sign-up', signUp)
router.post('/login', logIn)

export default router;