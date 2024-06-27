import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectDB } from './SRC/DB/database.js';
dotenv.config()

const app = express()

app.use(cors({origin:'*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const startServer = async () => {
    const PORT = process.env.PORT
    connectDB()
    try {
        app.listen(PORT, () => {console.log(`FROG is running on http://localhost:${PORT}`)})
    } catch (error) {
        console.error(error.message);
    }
}

startServer()

app.get('/', (req,res) => res.send('Frog App is running'))