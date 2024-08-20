import dotenv from 'dotenv'
dotenv.config()

import { google } from 'googleapis'
import { createTransport } from 'nodemailer'
const OAuth2 = google.auth.OAuth2

const {CLIENT_ID,CLIENT_SECRET,REDIRECT_URL,GMAIL_NAME,REFRESH_TOKEN, ACCESSTOKEN} = process.env

console.log({
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL,
    GMAIL_NAME,
    REFRESH_TOKEN,
    ACCESSTOKEN
});

const oau2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
oau2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const smtpTransport = createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: GMAIL_NAME,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken:ACCESSTOKEN
    },
    tls: {
        rejectUnauthorized: false
     }
})

export const mailTransport = async (to, from, subject, html, attachments) => {
    

    const mailOptions = {to, from, subject, html, attachments}

    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions, (err, info) => {
            if (err) {
                return reject(err)
            }
            console.log(`Mail sent to [${to}] with response: ${info.response} 🐸🐸🐸🐸🐸`);
            resolve (info)
        })
    })
}