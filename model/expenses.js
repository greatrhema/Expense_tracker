const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
