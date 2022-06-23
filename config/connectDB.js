 import mongoose from "mongoose";
// const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const DB_OPTIONS = {
            dbName: "ecommerce"
        }
        // mongoose.connect('mongodb://localhost:27017/ecommerce');

        await mongoose.connect( process.env.DATABASE_URL, DB_OPTIONS)
        console.log("DATAbase connect successfully")
    } catch (err) {
        console.log(err)
    }
}
export default connectDB;

