import Payment from "../models/payments.model.js";
import Bill from "../models/bills.model.js";


//Add a Payment
export async function capturePayment(req, res) {
    try {
        let payment = await Payment.create(req.body);
        let bill = await Bill.findOne({where: {bill_id: req.body.bill_id}})

        if (payment) {
            if (bill.amount == req.body.amount_paid && bill.paid == false) {
                bill.paid = true;

                await bill.save();
                await bill.reload();
            }
            if (bill.amount > req.body.amount_paid && bill.paid == false) {
                bill.amount = bill.amount - req.body.amount_paid;

                await bill.save();
                await bill.reload();
            }
            res.status(200).json({
                success: true,
                message: 'Payment captures successfully',
                data: payment
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment could not be captured, bad request'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//View all payments
export async function viewAllPayments(req, res) {
    try {
        let allpayments = await Payment.findAll();
        if (allpayments.length > 0) {
            console.log(allpayments);
            res.json({
                success: true,
                message: 'Payment records retrieved successfully',
                data: allpayments
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No Payment records found.',
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

// View payments by premise
export async function viewPaymentsByPremise(req, res) {
    try {
        let allpayments = await Payment.findAll({where: {premise_id: req.params.id}});
        if (allpayments.length > 0) {
            res.json({
                success: true,
                message: 'Payment records retrieved successfully',
                data: allpayments
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No Payment records found.',
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//Delete a Payment
export async function deletePayment(req, res) {
    try{
        const payment = await Payment.findOne({where: {payment_id: req.params.id}})
        if (payment){
            await payment.destroy();

            res.status(200).json({
                success: true,
                message: 'Payment deleted successfully',
                data: payment
            })
        }else{
            res.status(404).json({
                success: false,
                message: 'Payment not found'
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'There is something wrong with the server'
        })
    }
}
