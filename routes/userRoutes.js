const userController = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const express = require("express");
const userRoutes = express.Router();


userRoutes.post("/register",userController.registerUser);
userRoutes.post("/login",userController.loginUser);
userRoutes.get("/",protect,userController.getUsers);


module.exports = userRoutes;