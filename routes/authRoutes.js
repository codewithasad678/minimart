const authController = require("../controllers/authController");
const express = require("express");
const authRoutes = express.Router();

authRoutes.post("/refresh_token",authController.refreshToken);


module.exports = authRoutes;