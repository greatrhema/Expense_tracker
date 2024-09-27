const express = require("express");


const router = express.Router();

const { validateRegistration, validateEmail, validateLogin, authenticate } = require("../middleware/validations");

const { register } = require("../controls/generalControl")

const { login } = require("../controls/generalControl")

const { postIncome, getIncome, putIncome, deleteIncome } = require("../controls/incomeControl")

const { postExpense, getExpense, putExpense, deleteExpense } = require("../controls/expenseControl")

const { Expense} = require("../controls/expenseControl")



//Register
router.post("/register", validateRegistration, register)

//Login
router.post("/login", validateLogin, login)

//Logout
router.post("/logout")

// Create income
router.post('/income', postIncome)

// Read income
router.get('/income', getIncome)

// Update income
router.put('/income/:id', putIncome)

// Delete income
router.delete('/income/:id', deleteIncome)



// Create Expense
router.post('/expense', postExpense)

// Read Expense
router.get('/expense', getExpense)

// Update Expense
router.put('/expense/:id', putExpense)

// Delete Expense
router.delete('/expense/:id', deleteExpense)


module.exports = router