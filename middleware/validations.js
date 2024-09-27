const jwt = require('jsonwebtoken');
const user = require('../model/users');
const generateToken = require('../Utility/jwt');


// Authenticate User
// const authenticateUser = (req, res, next) => {
//     req.user = { id: generateToken }; 

//     // if(!id){
//     //     return res.status(400).json({message: errors})
//     // }


//     next();
// };



// Validate Registration
const validateRegistration = async(req, res, next)=>{

    try {
        const { username, email, password, budgetLimit } = req.body
    
        const errors = []
    
        if(!email){
            errors.push("Please add your email")
        } else if(!validEmail(email)){
            errors.push("Incorrect email format")
        }
    
        if(!username){
            errors.push("Please add your username")
        }
    
        if(!password){
            errors.push("Please add your password")
        }
    
        if(!budgetLimit){
            errors.push("Please add your budget limit")
        }
    
    
        if(password.length < 8){
            errors.push("Minimum of eight characters required for password.")
        }
    
    const alreadyExisting = await user.findOne({email, username})
    
    if(alreadyExisting){
      return res.status(400).json({message: "User already exist!"})
    }
  
    if(errors.length > 0){
        return res.status(400).json({message: errors})
    }
  
    next()
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
    
  }

// Validate Login
const validateLogin = async(request, response, next)=>{

    try {
      const { email, password } = request.body
  
      const errors = []
    
      if(!email){
          errors.push("Please add your email")
    
      } else if(!validEmail(email)){
          errors.push("Invalid Email format")
      }
    
      if(!password){
          errors.push("Please add your password")
      }
    
      if(errors.length > 0){
          return response.status(400).json({message: errors})
      }
    
      next()
     
    } catch (error) {
      return response.status(500).json({ message: error.message })
    }
    
  }
   
  //Validate Email
  const validEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  
  module.exports = {
    validateRegistration,
    validateLogin,
    validEmail
  }