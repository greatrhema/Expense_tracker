const express = require("express")
const connectToDatabase = require("./db")
const Users = require("./model/auth");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const { validateRegistration, validateLogin } = require("./middleware/validations");



const app = express();

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 8000

//DB Connection
connectToDatabase()

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})

app.get("/", (req, res)=>{
    return res.status(200).json({message: "Welcome to Expense Tracker Project!!!"})
})

//sign up

app.post("/register", validateRegistration, async (req, res) => {
    const { firstName, lastName, email, password, dateOfBirth,} = req.body;

/*     if (!email){
        return res.status(400).json({message: "Please enter your email"})

    }
    if (!password.length >8){
        return res.status(400).json({message: "Password should be 8 or more characters"})

    } */

    const existingUser = await Users.findOne({email})

    if(existingUser){
        return res.status(400).json({message: "User already exist!"})
    }
    // Hash PW

    const hashedPassword = await bcrypt.hash(password, 13)

    const newUser = new Users({firstName, lastName, email, password: hashedPassword, dateOfBirth})

    await newUser.save()

    //send Users email


    return res.status(200).json({message: "Successful", user: newUser})
    
})

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

