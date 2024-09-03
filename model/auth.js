const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    userID: {type: Number},
    firstName: {type: String, require:true},
    lastName: {type: String, require:true},
    email: {type: String, require:true},
    password: {type: String, require:true},
    dateOfBirth: {type: Date, require:true}
},{
    timestamps: true
})

const users = new mongoose.model("users", authSchema)

module.exports = users