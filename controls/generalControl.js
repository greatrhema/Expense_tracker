
const User = require("../model/users");
const bcrypt = require("bcryptjs");
const generateToken = require("../Utility/jwt")
const jwt = require('jsonwebtoken');

//REGISTER
const register = async (req, res) => {
   try { 
    const { username, email, password, currency, budgetLimit } = req.body;

    
        //     // Hash PW

     const hashedPassword = await bcrypt.hash(password, 13)
        const user = new User({
            username,
            email,
            password:hashedPassword,
            accountSettings: { currency, budgetLimit }
        });


        await user.save();
//        const token = generateToken(user);

        res.status(201).json({ user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


//LOGIN
const login = async (req, res) => {

        //applying try-catch then compare email & password
        try {
            
    
        const {email, password} = req.body
    
        const user = await User.findOne({email})
    
    
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
    
    
        await User.findOneAndUpdate({_id: user._id}, {
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
    }
    
 

//Logout
const logout = async (req, res) => {

    try {
        res.clearCookie('refreshToken')
        return res.json({msg: "Logged out!"})

    } catch (err) {
        return res.status(400).json({msg: err.message})
    }
}



module.exports = {
    register, login, logout
}