const mongoose = require("mongoose");

const connectDB  = async ()=> {
    
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);

        if(conn){
            console.log("MongoDB Connected Successfully!");
        }
        else{
            console.log("MongoDB Connection Failed");
        }
    } catch (error) {
        console.log(`Error while connecting with MongoDB: Error:${error.message}`);
          process.exit(1); // stop server if DB fails
    }
}

module.exports = connectDB;