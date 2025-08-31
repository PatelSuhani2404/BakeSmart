import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : { 
        type : String, 
        required : [true,"Please enter product name."]
    },
    price : { 
        type : Number, 
        required : [true,"Please enter product price."]
    },
    flavor : { 
        type : String, 
        required : false
    },
    image : { 
        type : String, 
        required : true
    },
    weight : { 
        type : String, 
        required : false
    }, 
    category : { 
        type : String, 
        required : [true,"Please enter category."]
    },   
}, 
{timestamps: true});

const Product = mongoose.model("Product",productSchema)
export default Product;