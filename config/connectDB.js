import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const DB_OPTIONS = {
            dbName: "ecommerce"
        }
        await mongoose.connect( process.env.DATABASE_URL, DB_OPTIONS)
        console.log("DATAbase connect successfully")
    } catch (err) {
        console.log(err)
    }
}
export default connectDB;