const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
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
    source: {type:String, require:true},
    amount: {type: Number, require:true},
    date: {type: Date, require:true},

//    timestamps: true
})

const Order = new mongoose.model("Order", orderSchema)

module.exports = Order;