const express = require("express");
const orderRoutes = express.Router();
const OrderController = require("../controllers/OrderController");
const Auth = require("../middleware/authMiddleware");
const asyncHandler = require("../middleware/asyncHandler");


orderRoutes.post("/create",Auth.TokenValid,Auth.isAdmin, asyncHandler(OrderController.createOrder));
orderRoutes.get("/:id",Auth.TokenValid, asyncHandler(OrderController.getOrderById));
orderRoutes.get("/myorder/:userid",Auth.TokenValid, asyncHandler(OrderController.getOrdersByUserId));
orderRoutes.get("/",Auth.TokenValid, asyncHandler(OrderController.getAllOrders));

module.exports = orderRoutes;