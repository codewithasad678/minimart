const Product = require('../models/productModel');
const Response = require("../utils/response");
const Validator = require("../utils/validateProduct");
const fs = require('fs');
const path = require('path');

const getAllProducts = async (req, res) => {
    try{
        let {page = 1, limit = 10, search = ""} = req.query;
        const query = search ? { name: { $regex: search, $options: "i" } } : {};
        
        page = Number(page);
        limit = Number(limit);

        const total = await Product.countDocuments(query);

        if (total === 0) {
            return Response.error(res, 404, "No products found");
        }

        const totalPages = Math.ceil(total / limit);

        if (page > totalPages) {
            return Response.error(res, 404, "Page out of range");
        }

        const products = await Product.find(query).select("-__v").skip((page - 1) * limit).limit(limit);

        if(!products || products.length === 0){
            return Response.error(res,404,"No products found");
        }

       res.status(200).json({
            success: true,
            status: 200,
            message: "Products fetched successfully",
            data: products,
            page: page,
            limit: limit,
            total: total
       });
    }catch(error){
        Response.error(res,500,error.message);
    }
    
};

const getProduct = async (req, res) => {
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId).select("-__v");

        if(!product){
            return Response.error(res,404,"Product not found");
        }
        Response.success(res,200,"Product fetched successfully",product);
    }catch(error){
        Response.error(res,500,error.message);
    }   
}

const createProduct = async (req, res) => {

    try{
        const {error} = Validator.validateProduct(req.body);
        
        if(error){
            return Response.error(res,400,error.details[0].message);
        }

        req.body.image = req.file ? `/storage/product_images/${req.file.filename}` : null;

        const newProduct = await Product.create(req.body);

        if(!newProduct){
            return Response.error(res,500,"Failed to create product");
        }

        Response.success(res,201,"Product created successfully",newProduct);

    }catch(error){
        Response.error(res,500,error.message);
    }
};

const updateProduct = async (req, res) => {
    try{
        const productId = req.params.id;
        const {error} = Validator.updateProduct(req.body); 
        if(error){
            return Response.error(res,400,error.details[0].message);
        }       
        
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return Response.error(res, 404, "Product not found");
        }

        if(req.file){
            req.body.image =`/storage/product_images/${req.file.filename}`;

            if(existingProduct.image){
               
                const oldImagePath = path.join(__dirname, "../", existingProduct.image);    

                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error("Failed to delete old image:", err); 
                    } else {
                        console.log("Old image deleted successfully");
                    }   
                });
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true}).select("-__v");
        if(!updatedProduct){
            return Response.error(res,404,"Product not found");
        }   
        Response.success(res,200,"Product updated successfully",updatedProduct);
    }catch(error){
        Response.error(res,500,error.message);
    }
};

const deleteProduct = async (req, res) => {
    try{
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId).select("-__v");          
        if(!deletedProduct){
            return Response.error(res,404,"Product not found");
        }
        Response.success(res,200,"Product deleted successfully");
    }catch(error){
        Response.error(res,500,error.message);
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};