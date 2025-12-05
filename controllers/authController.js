const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Response = require("../utils/response");
const JW = require("../utils/jwt");

const refreshToken = async (req, res) => {
    try {
        const { refresh_token } = req.body;
        if (!refresh_token) {
            return Response.error(res, 400, "Refresh token is required");
        }

        const user = await User.findOne({refreshToken: refresh_token });
        
        if (!user) {
            return Response.error(res, 403, "Invalid refresh token");
        }

        const decoded  = jwt.verify(refresh_token,process.env.JWT_REFRESH_SECRET_KEY);

        if(!decoded){
            return Response.error(res, 403, "Refresh token is invalid or expired");
        }

        const newAccessToken = JW.generateAccessToken(user.id);
        const newRefreshToken = JW.generateRefreshToken(user.id);

        user.refreshToken = newRefreshToken;
        await User.findByIdAndUpdate(
            user._id,
            { refreshToken: newRefreshToken },
            { validateBeforeSave: false }
        );

        return Response.success(res, 200 ,
            "Token refreshed successfully",
            { accessToken: newAccessToken,
            refreshToken: newRefreshToken}
        );
        
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return Response.error(res, 401, "Token expired");
        }
        return Response.error(res, 400, error.message);
    }
};


module.exports = {
    refreshToken
}