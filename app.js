const express=require("express");
const cors=require("cors")
const app=express();

const analyzeRoute = require("./routes/analyze");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/analyze", analyzeRoute);

module.exports = app;