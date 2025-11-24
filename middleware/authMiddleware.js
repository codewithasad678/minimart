const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


const protect = async (req,res,next) => {
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }

        const decoded  = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id).select("-password");

        if(!token){
            res.status(400).json({success : false, error : "Not authorized"})
        }

    } catch (error) {
        res.status(500).json({success : false, error : error.message})
    }
}

module.exports = protect;