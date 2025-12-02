const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productController');
const Auth = require('../middleware/authMiddleware');
const upload = require("../middleware/upload");

productRoutes.get("/",Auth.TokenValid,productController.getAllProducts);
productRoutes.get("/:id",Auth.TokenValid,productController.getProduct);
productRoutes.post("/create",Auth.isAdmin,upload.single("image"),productController.createProduct);
productRoutes.put("/update/:id",Auth.isAdmin,upload.single("image"),productController.updateProduct);
productRoutes.delete("/delete/:id",Auth.isAdmin,productController.deleteProduct);

module.exports = productRoutes;