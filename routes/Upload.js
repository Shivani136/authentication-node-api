import express from "express";
import multer from "multer";

const app = express();

const Upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpeg")
        }

    })
}).single("user_file");


 
export default Upload;