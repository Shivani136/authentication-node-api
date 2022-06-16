import dotenv from 'dotenv';
dotenv.config()
import express  from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
const port = process.env.PORT
// const DATABASE_URL = process.env.DATABASE_URL

//cors policy 
app.use(cors())

// database connecion
connectDB(connectDB)
 
//config json
app.use(express.json())

//LOAD rOUTES
app.use("/api/user", userRoutes)

app.listen(port,()=>{
    console.log(`server is listening to port ${port}`)
})