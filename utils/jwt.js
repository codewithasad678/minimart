const jwt = require("jsonwebtoken");


const generateAccessToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn : "60d"});
}

const generateRefreshToken = (id) => {
    return jwt.sign({id},process.env.JWT_REFRESH_SECRET_KEY,{expiresIn : "60d"});
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};