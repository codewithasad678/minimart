const userController = require("../controllers/userController");
const Auth = require("../middleware/authMiddleware");
const asyncHandler = require("../middleware/asyncHandler");
const express = require("express");
const userRoutes = express.Router();


userRoutes.post("/register",asyncHandler( userController.registerUser));
userRoutes.post("/login",asyncHandler(userController.loginUser));
userRoutes.get("/",Auth.TokenValid,asyncHandler(userController.getUsers));


module.exports = userRoutes;