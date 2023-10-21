const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
app.use(express.json())
connectDB();

app.get("/", (req,res)=>{
    res.send("API server is running");
});

const PORT = process.env.PORT || 5000 

app.listen(PORT, console.log('server running in dev or 5000'))