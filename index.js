const express = require("express");
const cors = require('cors');
const connectToDatabase = require("./db")
const Users = require("./model/users");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const general = require("./routes/general")
const jwt = require("jsonwebtoken");
const { authenticateUser } = require("./middleware/validations");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000

//DB Connection
connectToDatabase()

//Server config
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})

app.get("/", (req, res)=>{
    return res.status(200).json({message: "Welcome to Expense Tracker Project!!!"})
})

//router
app.use(general,)




//TO MANAGE INVALID ENDPOINTS
app.use((req,res)=>{
    return res.status(400).json({message: "This endpoint does not exist"})

})