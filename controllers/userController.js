const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Response = require("../utils/response");
const sendEmail = require("../utils/sendEmail");
const Token= require("../utils/jwt");
const crypto = require("crypto");

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


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No user found with this email"
    });
  }

  // Generate token
  const resetToken = user.generatePasswordResetToken();

  // Save fields resetPasswordToken, resetPasswordExpire
  await user.save({ validateBeforeSave: false });

  // Simulate email (print in console)
  const resetUrl = `${process.env.ENV_URL}/api/users/reset-password/${resetToken}`;
  const message = `You requested a password reset.\n\n` +
                    `Click the link below to reset your password:\n\n${resetUrl}\n\n` +
                    `If you did not request this, ignore this email.`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password Reset Token",
            message
        });

        Response.success(res, 200, "Password reset link sent to email", { resetUrl });

    } catch (error) {
        // If email fails, remove token from DB
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return Response.error(res, 500, error.message);
    }

};

const resetPassword = async (req, res) => {
  const token = req.params.token;

  // Hash token to compare
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Token is invalid or expired"
    });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.json({
    success: true,
    message: "Password has been reset successfully"
  });
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    forgotPassword,
    resetPassword
}