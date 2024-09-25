const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    userID: {type: String},
    firstName: {type: String, require:true},
    lastName: {type: String, require:true},
    email: {type: String, require:true},
    password: {type: String, require:true},
    dateOfBirth: {type: Date, require:true},
  //  currency: {type: Intl.NumberFormat , required:true}, 
    budgetLimit: {type: Number, required:true}
},{
    timestamps: true,
    currency: Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    })
})

const users = new mongoose.model("users", usersSchema)

module.exports = users