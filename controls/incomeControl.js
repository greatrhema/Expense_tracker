
const Order = require('../model/income')


const updateTransactionStatus = async (req, res ) => {
    try {
        const userId = req.user.id;
        const { payment_id, order_id} = req.body;
        const order  = await Order.findOne({where : {orderid : order_id}}) //2
        const promise1 =  order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
        const promise2 =  req.user.update({ ispremiumuser: true }) 

        Promise.all([promise1, promise2]).then(()=> {
            return res.status(202).json({sucess: true, message: "Transaction Successful", token: userController.generateAccessToken(userId,undefined , true) });
        }).catch((error ) => {
            throw new Error(error)
        })

        
                
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Something went wrong' })

    }
}

module.exports = {updateTransactionStatus}