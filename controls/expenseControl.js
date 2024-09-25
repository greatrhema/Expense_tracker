const Expense = require('../model/expenses');

const addExpense = (req, res) => {
    const { expenseAmount, description, category } = req.body;

    if(expenseAmount == undefined || expenseAmount.length === 0 ){
        return res.status(400).json({success: false, message: 'Parameters missing'})
    }
    
    Expense.create({ expenseAmount, description, category, userId: req.user.id}).then(expense => {
        return res.status(201).json({expense, success: true } );
    }).catch(err => {
        return res.status(500).json({success : false, error: err})
    })
}

const getExpenses = (req, res)=> {
    
    Expense.findAll({ where : { userId: req.user.id}}).then(expenses => {
        return res.status(200).json({expenses, success: true})
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({ error: err, success: false})
    })
}

const deleteExpense = (req, res) => {
    const expenseid = req.params.expenseid;
    if(expenseid == undefined || expenseid.length === 0){
        return res.status(400).json({success: false, })
    }
    Expense.destroy({where: { id: expenseid, userId: req.user.id }}).then((noOfRows) => {
        if(noOfRows === 0){
            return res.status(404).json({success: false, message: 'Expense does not belong to the user'})
        }
        return res.status(200).json({ success: true, message: "Deleted Successfuly"})
    }).catch(err => {
        console.log(err);
        return res.status(500).json({ success: true, message: "Failed"})
    })
}

module.exports = {
    deleteExpense,
    getExpenses,
    addExpense
}