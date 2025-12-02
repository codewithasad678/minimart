const express = require("express");
const orderRoutes = express.Router();
const OrderController = require("../controllers/OrderController");
const Auth = require("../middleware/authMiddleware");


orderRoutes.post("/create",Auth.TokenValid, OrderController.createOrder)
orderRoutes.get("/:id",Auth.TokenValid, OrderController.getOrderById);
orderRoutes.get("/:userId",Auth.TokenValid, OrderController.getOrdersByUserId);
orderRoutes.get("/",Auth.TokenValid,Auth.isAdmin, OrderController.getAllOrders);

module.exports = orderRoutes;