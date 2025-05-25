const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const captionRoutes = require("./routes/caption.routes");
const connectDB = require('./db/connect');
const cookieParser = require("cookie-parser");

// Database setup
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const cors = require("cors");
app.use(cors({
    origins: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
}));
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.send("Welcome to the Backend Server!");
});

app.use("/users", userRoutes);
app.use("/captions", captionRoutes);

module.exports = app;