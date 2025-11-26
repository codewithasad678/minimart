const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Response = require("../utils/response");
const Token= require("../utils/jwt");


const registerUser = async (req,res) => {
    try {
        const user = await User.create(req.body);

         if (!user) return Response.error(res, 400, "User not created");
        
        const access_token = Token.generateAccessToken(user._id);
        const refresh_token = Token.generateRefreshToken(user._id);
        const updatedUser = await User.findByIdAndUpdate(user._id, { refreshToken: refresh_token }, { new: true }).exec();

        const { password: pwd,refreshToken : rt,_v: b, ...userData } = user._doc;

         return Response.success(
            res,
            201,
            "User registered successfully",
            userData,
            access_token,
            refresh_token
        );
    } catch (error) {
        return Response.error(res, 400, error.message);
    }
}


const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}).select([ "-__v", "-createdAt", "-refreshToken"]);

        if(user){
            const isPasswordCorrect = await user.comparePassword(password);
            if(!isPasswordCorrect)
               return Response.error(res, 401, "Incorrect password");
        
            const access_token = Token.generateAccessToken(user._id);
            const refresh_token = Token.generateRefreshToken(user._id);
            const updatedUser = await User.findByIdAndUpdate(user._id, { refreshToken: refresh_token }, { new: true }).exec();
            const { password: pwd, ...userData } = user._doc;
            console.log(updatedUser);
            return Response.success(
                res,
                200,
                "Login successful",
                userData,
                access_token,
                refresh_token
            );
        }else{
              return Response.error(res, 404, "User not found");
        }
    } catch (error) {
           return Response.error(res, 400, error.message);
    }
}


const getUsers = async (req, res) => {
    try {
        const users = await User.find().select(["-password", "-__v", "-createdAt", "-refreshToken"]);
       return Response.success(
            res,
            200,
            "Users fetched successfully",
            users
        );
    } catch (error) {
        return Response.error(res, 500, error.message);
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUsers
}