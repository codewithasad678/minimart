const Express = require("express");
const app = Express();
const json = Express.json(); // Build-in middleware.
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const limiter = require("./utils/ratelimit");

const errorHandler  = require("./middleware/errorMiddleware");

// load ENV
const dotenv = require("dotenv");
dotenv.config();

// DB connection
const connectDB = require("./config/db");
connectDB();

// Routes import
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");


// Middlewares
app.use(json);

app.use(cors({
    origin: "http://localhost:5000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(helmet());
app.use(limiter);
app.use(morgan("dev"));

// Routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/orders",orderRoutes);

// Static folder
app.use("/storage", Express.static(path.join(__dirname, "storage")));

app.get("/",(req,res)=>{
    res.send("Home Page");
});


app.use(errorHandler);

app.listen(process.env.PORT,(req,res) => {
    console.log(`Server is running on PORT:${process.env.PORT}` );
});