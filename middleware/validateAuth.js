

const jwt = require("jsonwebtoken")

const user = require("../Models/userProfile")

const validateTk = async(request, response, next)=>{
  
  try {
    const tk = request.header("authorization")

    const tkk = tk.spilt(" ")
  
    const token =tkk[1]
  
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

    if(!decoded){
      return response.status(500).json({message: "Invalid Login details"})
    }

    const User = await user.findOne({_id: decoded.user._id})

    if(!User){
      return response.status(500).json({message: "Access denied"})
    }

    request.user = user

    next()

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

module.exports = validateTk