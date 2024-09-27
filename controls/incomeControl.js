const express = require("express");
const app = express();
const User = require("../model/users");

const generateToken = require('../Utility/jwt');

const Income = require('../model/income');

const router = require('../routes/general');
const { authenticate } = require("../middleware/validations");



//const authenticateUser = require("../middleware/validations",)


// app.use((req, res, next) => {
//     req.User = { id: generateToken }; 
//     if (!req.User) {
//         return res.status(401).json({ error: 'User not authenticated' });
 //   }
   // const userID = req.user.id;
    

    // if(!id){
    //     return res.status(400).json({message: errors})
    // }


//     next();
// });


//Post Income
const postIncome =  async (req, res) => {
   try { 
    const { source, amount, date } = req.body;
    const userID = req. User.id;

    
        const income = new Income({ source, amount, date, userID });
        await income.save();
        res.status(201).json({ income, message: 'Income logged successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Get Income
const getIncome = async (req, res) => {
       try { 
        const userID = req.User.id;


        const incomes = await Income.find({ userID });
        res.status(200).json({ incomes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Put Income
const putIncome = async (req, res) => {
   try {  
    const { id } = req.params;
    const { source, amount, date } = req.body;

   
        const income = await Income.findByIdAndUpdate(id, { source, amount, date }, { new: true });
        res.status(200).json({ income, message: 'Income updated successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Delete Income
const deleteIncome = async (req, res) => {
  try {  
    const { id } = req.params;

    
        await Income.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// const Income = async (req, res ) => {
//     try {
//         const userId = req.user.id;
//         const { payment_id, order_id} = req.body;
//         const order  = await Order.findOne({where : {orderid : order_id}}) //2
//         const promise1 =  order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
//         const promise2 =  req.user.update({ ispremiumuser: true }) 

//         Promise.all([promise1, promise2]).then(()=> {
//             return res.status(202).json({sucess: true, message: "Transaction Successful", token: userController.generateAccessToken(userId,undefined , true) });
//         }).catch((error ) => {
//             throw new Error(error)
//         })

        
                
//     } catch (err) {
//         console.log(err);
//         res.status(403).json({ errpr: err, message: 'Something went wrong' })

//     }
// }




module.exports = {postIncome, getIncome, putIncome, deleteIncome}