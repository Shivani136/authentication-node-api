import mongoose from "mongoose";

// define sechema
const userSchema = new mongoose.Schema({
    name:{ type: String, required: true, trim: true},
    email:{ type: String, required: true, trim: true},
    password:{ type: String, required: true, trim: true},
    tc:{ type: Boolean, required: true, trim: true},
    
} , { timestamps: true },
)

//model
const UserModel = mongoose.model("user",userSchema);
export default UserModel;


