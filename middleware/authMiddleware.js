const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Response = require("../utils/response");

const TokenValid = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return Response.error(res, 401, "Not authorized, no token");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return Response.error(res, 404, "User not found");
        }

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return Response.error(res, 401, "Token expired");
        }
        return Response.error(res, 500, error.message);
    }
};

const isAdmin = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return Response.error(res, 401, "Not authorized, no token");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return Response.error(res, 404, "User not found");
        }

        if (req.user && req.user.role === "admin") {
            next(); 
        } else {
            return Response.error(res, 403, "Access denied, admin only");
        }   
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return Response.error(res, 401, "Token expired");
        }
        return Response.error(res, 500, error.message);
    }
};


module.exports = {
    TokenValid,
    isAdmin
};
