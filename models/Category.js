import mongoose from "mongoose";

// define sechema
const categorySchema = mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    // userId: { type: Schema.Types.ObjectId, ref: 'userCreate' },
    // image:{ type: String, required: true, trim: true},
    place:
    {
        type: Array
    },
    company: { type: Array },
   direction: [
        {
            title: { type: String, trim: true },
            description: { type: String, trim: true },
            conent: { type: String, trim: true },
        },
    ],
}, { timestamps: true },
)
//model
const CategoryModel = mongoose.model("Cateory", categorySchema);
export default CategoryModel;


