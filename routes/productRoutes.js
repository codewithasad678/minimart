const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productController');


productRoutes.get("/",productController.getAllProducts);
productRoutes.post("/create-product",productController.createProduct);



module.exports = productRoutes;