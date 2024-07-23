import Admin from "../models/admin.model.js";
import { connectDB } from '../DB/database.js'
import dotenv from 'dotenv'
import {createHash} from "crypto";
dotenv.config({path:'../../.env'})
connectDB(process.env.MONGODB_URL)

const seedAdmin = async () => {
    try {
        console.log('started seeding process');

        const adminData = {
            name: 'Frog',
            email: 'frog@gmail.com',
            password: 'super-frog',
            phoneNumber: '1234567890'
        }
        const hashedPassword = createHash('sha256').update(adminData.password).digest('base64')
        adminData.password = hashedPassword
        const newAdmin = new Admin(adminData)

        await newAdmin.save()
        console.log('admin created successfully', adminData);
    } catch (error) {
        console.log('error while seeding admin:',error);
    } finally {
        console.log('finished admin seeding process');
        process.exit(0)
    }
}

seedAdmin ()