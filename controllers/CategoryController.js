import CategoryModel from "../models/Category.js";
import multer from "multer";

class CategoryController {

    static addCategory = async (req, res) => {
        try {
            // const { firstName, place } = req.body
        
             let data = new CategoryModel(req.body);
                let result = await data.save();
                console.log(req.body)
                res.send({
                    "message": "CATEGORY added Successfully",
                    result: result
                })
                // if (image) {

                //     const Upload = multer({
                //         storage: multer.diskStorage({
                //             destination: function (req, file, cb) {
                //                 cb(null, "uploads")
                //             },
                //             filename: function (req, file, cb) {
                //                 cb(null, file.fieldname + "-" + Date.now() + ".jpeg")
                //             }
    
                //         })
                //     }).single("user_file");

                //     res.status(201).send({ "status": "True", "message": "Sucessfully added data", })
                // } else {
                //     res.status(400).send({ "status": "failed", "message": "please upload image" })
                // }
                //  res.status(201).send({ "status": "True", "message": "Sucessfully added data", })
           
              
                // res.status(400).send({ "status": "failed", "message": "All Fields are Required" })
           
        } catch (err) {
            console.log(err)
        }
    }



}

export default CategoryController;