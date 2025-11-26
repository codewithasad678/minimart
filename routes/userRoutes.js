const userController = require("../controllers/userController");
const Auth = require("../middleware/authMiddleware");
const express = require("express");
const userRoutes = express.Router();


userRoutes.post("/register",userController.registerUser);
userRoutes.post("/login",userController.loginUser);
userRoutes.get("/",Auth.TokenValid,userController.getUsers);


module.exports = userRoutes;