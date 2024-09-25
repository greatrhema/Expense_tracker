const express = require("express");
const cors = require('cors');
const connectToDatabase = require("./db")
const Users = require("./model/users");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const general = require("./routes/general")
const { validateRegistration, validateLogin, authenticate } = require("./middleware/validations");
const jwt = require("jsonwebtoken")

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

//sign up
app.use(general)


//Query user
app.get("/user:id", async (req, res)=>{



    try {
        const {id} = req.params

        const user = await Users.findById(id)

        return res.status(200).json({
            message: "Successful",
            user
        })


    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }

    }) 





//Logout
app.post("/logout", async (req, res) => {

    try {
        res.clearCookie('refreshToken')
        return res.json({msg: "Logged out!"})

    } catch (err) {
        return res.status(400).json({msg: err.message})
    }
})




//TO MANAGE INVALID ENDPOINTS
app.use((req,res)=>{
    return res.status(400).json({message: "This endpoint does not exist"})

})