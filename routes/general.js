const express = require("express");


const router = express.Router();

const { validateRegistration, validateEmail, validateLogin, authenticate } = require("../middleware/validations");

const { register } = require("../controls/generalControl")
const { login } = require("../controls/generalControl")



//Register
router.post("/register", validateRegistration, register)

//Login
router.post("/login", validateLogin, login)

//Logout
router.post("/logout")

module.exports = router