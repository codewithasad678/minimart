const Express = require("express");
const app = Express();
const json = Express.json(); // Build-in middleware.

// load ENV
const dotenv = require("dotenv");
dotenv.config();

// DB connection
const connectDB = require("./config/db");
connectDB();

// Routes import
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");


// Middlewares
app.use(json);


// Routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.get("/",(req,res)=>{
    res.send("Home Page");
});

app.listen(process.env.PORT,(req,res) => {
    console.log(`Server is running on PORT:${process.env.PORT}` );
});