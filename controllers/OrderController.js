const Order = require("../models/OrderModel");
const Response = require("../utils/response");

const createOrder = async (req, res) => {
    // Logic to create a new order
    res.send("Order created"); 
}

const getOrderById = async (req, res) => {
    const orderId = req.params.id;  
    // Logic to get order details by orderId
    res.send(`Details of order ${orderId}`); 
}  

const getOrdersByUserId = async (req, res) => {
    const userId = req.params.userId;   
    // Logic to get orders by userId
    res.send(`Details of user order ${userId}`); 
}

const getAllOrders = async (req, res) => {
    
    try {
        const orders = await Order.find({});
        
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