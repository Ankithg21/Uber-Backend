const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({
    origins: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
}));

app.get("/", (req,res)=>{
    res.send("Welcome to the Backend Server!");
});

module.exports = app;