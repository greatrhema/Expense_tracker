const express = require("express")
const connectToDatabase = require("./db")
const Users = require("./model/users");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const { validateRegistration, validateLogin } = require("./middleware/validations");
const jwt = require("jsonwebtoken")

const app = express();

// Middleware
app.use(express.json());

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

app.post("/register", validateRegistration, async (req, res) => {
    const { firstName, lastName, email, password, dateOfBirth, budgetLimit, } = req.body;


    const existingUser = await Users.findOne({email})

    if(existingUser){
        return res.status(400).json({message: "User already exist!"})
    }
    // Hash PW

    const hashedPassword = await bcrypt.hash(password, 13)

    const newUser = new Users({firstName, lastName, email, password: hashedPassword, dateOfBirth, budgetLimit})

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



//Login
app.post("/login", validateLogin, async (req, res)=>{
    //applying try-catch then compare email & password
    try {
        

    const {email, password} = req.body

    const user = await Users.findOne({email})


    if (!user){
        return res.status(400).json({message:"User account not found"})
    }

    const isMatched = await bcrypt.compare(password, user.password)

    if(!isMatched){
        return res.status(400).json({message:"Incorrect login credentials"})
    }

    //Token generation
    //Access token
    const accessToken = jwt.sign({user}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "10m"})

    //Refresh Token
    const refreshToken = jwt.sign({user}, `${process.env.REFRESH_TOKEN}`, {expiresIn: "20m"})


    await Users.findOneAndUpdate({_id: user._id}, {
        rf_token: refreshToken
      })
    

    return res.status(200).json({
        message: "Login successful",
        user,
        accessToken,
        refreshToken
        
    })

    } catch (error) {
        return res.status(400).json({message: error.message})
            
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


// //Refresh Token
// app.post("/refreshToken", async(req, res) => {
//     try {
//       const rf_token = req.cookies.refreshToken

//       if(!rf_token) return res.status(400).json({msg: "Please login now!"})

//       const decoded = jwt.verify(rf_token, `${process.env.REFRESH_TOKEN}`)

//       if(!decoded.id) return res.status(400).json({msg: "Please login now!"})

//       const user = await Users.findById(decoded.id).select("-password +rf_token")

//       if(!user) return res.status(400).json({msg: "This account does not exist."})


//       const access_token = generateAccessToken({id: user._id})
//       const refresh_token = generateRefreshToken({id: user._id}, res)

//       await Users.findOneAndUpdate({_id: user._id}, {
//         rf_token: refresh_token
//       })

//       res.json({ access_token, user })
      
//     } catch (err) {
//       return res.status(500).json({msg: err.message})
//     }
//   })