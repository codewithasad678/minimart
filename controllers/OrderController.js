const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Response = require("../utils/response");

const createOrder = async (req, res) => {
    try {
        const data = req.body;
        const newOrder = Order.create({
            user: data.user,
            orderItems: data.orderItems,
            totalPrice: data.totalPrice,
        });
        
        if(!newOrder){
            Response.error(res, 400, "Failed to create order");
            return;
        }   

        Response.success(res, 201, "Order created successfully", newOrder);
    } catch (error) {
        Response.error(res, 500, error.message );
    }
}

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;  
        const order = await Order.findById(orderId).populate("user", "name email").populate("orderItems.product", "name price");
        
        if (!order) {
            return Response.error(res, 404, "Order not found");
        }

        Response.success(res, 200, "Order retrieved successfully", order);

    } catch (error) {
        Response.error(res, 500, error.message );
    } 
    
}  

const getOrdersByUserId = async (req, res) => {
    try {
        const userid = req.params.userid;  

        const user = await User.findById(userid);

        if (!user) {
            return Response.error(res, 404, "User not found");
        }

        const order = await Order.find({ user: userid }).populate("user", "name email").populate("orderItems.product", "name price");

        if (!order) {
            return Response.error(res, 404, "Order not found");
        }

        Response.success(res, 200, "Order retrieved successfully", order);
        
    } catch (error) {
        Response.error(res, 500, error.message );
    } 
}

const getAllOrders = async (req, res) => {
    
    try {
        const orders = await Order.find().populate("user", "name email").populate("orderItems.product", "name price");
        
        if (!orders) {
            return Response.error(res, 404, "No orders found");
        }

        Response.success(res, 200, "Orders retrieved successfully", orders);
    }   catch (error) {
        Response.error(res, 500, error.message );
    }

}

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUserId,
    getAllOrders
};