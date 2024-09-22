const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema({
    userID: {type: Number,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true}
},
    // firstName: {type: String, require:true},
    // lastName: {type: String, require:true},
    // email: {type: String, require:true},
    // password: {type: String, require:true},
    // dateOfBirth: {type: Date, require:true}
// },
{
    expenseamount: {type:Number, require:true},
    category: {type: String, require:true},
    date: {type: Date, require:true},
    description: {type: String},

//    timestamps: true
})

const Expense = new mongoose.model("Expense", expenseSchema)

module.exports = Expense