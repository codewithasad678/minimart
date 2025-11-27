const Product = require('../models/Product');
const Response = require("../utils/response");
const validateProduct = require("../utils/validateProduct");

const createProduct = async (req, res) => {

    try{
        const {error} = validateProduct(req.body);
        
        if(error){
            return Response.error(res,400,error.details[0].message);
        }

        const newProduct = await Product.create(req.body);

        if(!newProduct){
            return Response.error(res,500,"Failed to create product");
        }

        Response.success(res,201,"Product created successfully",newProduct);

    }catch(error){
        Response.error(res,500,error.message);
    }
};



const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        
        if(!products || products.length === 0){
            return Response.error(res,404,"No products found");
        }

        Response.success(res,200,"Products fetched successfully",products);
    }catch(error){
        Response.error(res,500,error.message);
    }
    
};


module.exports = {
    getAllProducts,
    createProduct
};