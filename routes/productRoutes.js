const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productController');
const Auth = require('../middleware/authMiddleware');

productRoutes.get("/",Auth.TokenValid,productController.getAllProducts);
productRoutes.get("/:id",Auth.TokenValid,productController.getProduct);
productRoutes.post("/create",Auth.isAdmin,productController.createProduct);
productRoutes.put("/update/:id",Auth.isAdmin,productController.updateProduct);
productRoutes.delete("/delete/:id",Auth.isAdmin,productController.deleteProduct);

module.exports = productRoutes;