const jwt = require('jsonwebtoken');
const User = require('../model/users');

const authenticate = (req, res, next) => {

    try {
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token, 'secretkey');
        console.log('userID >>>> ', user.userId)
        User.findByPk(user.userId).then(user => {

            req.user = user; ///ver
            next();
        })

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
        // err
      }

}


// Validate Registration
const validateRegistration = async(req, res, next)=>{
    const { firstName, lastName, email, password, budgetLimit } = req.body
    
    const errors = []

    if(!email){
        errors.push("Please add your email")
    } else if(!validateEmail(email)){
        errors.push("Incorrect email format")
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

    if(errors.length > 0){
        return res.status(400).json({message: errors})
    }


    next()
}

// Validate Login
const validateLogin = async(req, res, next)=>{

    const { email, password } = req.body

    const errors = []

    if(!email){
        errors.push("Please add your email")
    } else if(!validateEmail(email)){
        errors.push("Incorrect email format")
    }

    if(!password){
        errors.push("Please add your password")
    }

    if(password.length < 8){
        errors.push("Minimum of eight characters required for password.")
    }


    if(errors.length > 0){
        return res.status(400).json({message: errors})
    }

    next()

}

// Validate Email With Regex


const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


module.exports = {
    validateRegistration,
    validateLogin,
    validateEmail,
    authenticate
    
}