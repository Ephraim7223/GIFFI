import { mailGenerator } from "../config/mailgen.js"
import { mailTransport } from "../config/mailer.js";

import dotenv from 'dotenv';
dotenv.config()

const website = 'www.youtube.com'

export const otpGeneration = async (email, otp) => {
    const html = {
        body: {
            signature: false,
            greeting: `Hello User`,
            intro: `Welcome to Giffi your otp is ${otp}`,
            outro: [
                `If you did not request an otp, please contact ${website}`,
                `Change your password to be logged out of all devices`
            ]
        }
    }
    const template = mailGenerator.generate(html)
    const mail = {
        to: email,
        subject: `Forget Password Mail`,
        from: 'ephraimjerome13@gmail.com',
        html: template
    }

    return mailTransport(mail.to, mail.from, mail.subject, mail.html)

}