const authController = require("../controllers/authController");
const express = require("express");
const authRoutes = express.Router();
const asyncHandler = require("../middleware/asyncHandler");

authRoutes.post("/refresh_token",asyncHandler(authController.refreshToken));


module.exports = authRoutes;