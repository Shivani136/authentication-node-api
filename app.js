import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from 'cors';
import Upload from './routes/Upload.js';
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

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.use(express.urlencoded({ extended: true }));

//LOAD rOUTES
app.use("/api/user", userRoutes)
app.post('/upload', Upload, (req, res) => {
    res.send(200, "file upload");
})


app.listen(port, () => {
    console.log(`server is listening to port ${port}`)
})