const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign(
        { id }, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: "30d" } // 
    );
};

const registerUser = async (req,res) => {
    try {
        const user = await User.create(req.body);

        if(!user)
            res.status(400).json({success : false , error : "User not created."});
        
        const token = generateToken(user._id);
        const { password: pwd, ...userData } = user._doc;

        res.status(201).json({success : true, data : userData,token})
    } catch (error) {
         res.status(400).json({success : false , error : error.message});
    }
}


const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(user){
            const isPasswordCorrect = await user.comparePassword(password);
            if(!isPasswordCorrect)
                return res.status(401).json({success : false , error : "Incorrect Pasword!"});
        
            const token = generateToken(user._id);
            const { password: pwd, ...userData } = user._doc;

            res.status(200).json({success : true , data : userData,token});
        }else{
            res.status(404).json({success : false , error : "User Not Found."});
        }
    } catch (error) {
         res.status(400).json({success : false , error : error.message});
    }
}


const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUsers
}