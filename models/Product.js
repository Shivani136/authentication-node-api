// const mongoose = require('mongoose');
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    place: String,
    email: String,
    age: Number,
    phone: Number,
  
}, 
 { timestamps: true },
);
const ProductModel = mongoose.model("user-list",productSchema);
export default  ProductModel;
// module.exports = mongoose.model('user-list', productSchema);



