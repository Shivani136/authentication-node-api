 import ProductModel from "../models/Product.js";


 class ProductController {


    static userCreate = async (req, res) => {
        let data = new ProductModel(req.body);
        let result = await data.save();
        console.log(req.body)
        res.send({
            "message":"user added Successfully",
            result : result
        })
    }

    static userList = async (req, res) => {
        let data = await ProductModel.find();
        res.send(data);

        console.log("data ===" ,data)
    }

    static userDelete = async (req, res) => {
        
      
        let data = await ProductModel.deleteOne(req.params);
        res.send(data);
    }

    static userDetail = async (req, res) => {
        const id = req.query.id
        console.log("------------",id)
        let data = await ProductModel.findById({_id:id});
        res.send(data);
    }



    static userUpdate = async (req, res) => {
        console.log(req.params)
        let data = await ProductModel.updateOne(
            req.params,//condition
            {
                $set: req.body //updateded data
            });
        res.send(data);
    }

    static Search = async (req, res) => {
        console.log(req.params.key)
        let data = await ProductModel.find(
            {
                "$or": [
                    { "name": { $regex: req.params.key } },
                    { "place": { $regex: req.params.key } },
                    { "email": { $regex: req.params.key } }
                ]
            }
        );
        res.send(data);
    }




    
    
    
}

export default ProductController;