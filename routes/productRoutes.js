const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productController');
const Auth = require('../middleware/authMiddleware');
const asyncHandler = require('../middleware/asyncHandler');
const upload = require("../middleware/upload");

productRoutes.get("/",Auth.TokenValid,asyncHandler(productController.getAllProducts));
productRoutes.get("/:id",Auth.TokenValid,asyncHandler(productController.getProduct));
productRoutes.post("/create",Auth.isAdmin,upload.single("image"),asyncHandler(productController.createProduct));
productRoutes.put("/update/:id",Auth.isAdmin,upload.single("image"),asyncHandler(productController.updateProduct));
productRoutes.delete("/delete/:id",Auth.isAdmin,asyncHandler(productController.deleteProduct));

module.exports = productRoutes;