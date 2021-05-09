import Bill from "../models/bills.model.js";
import Premise from "../models/premises.model.js"


//Add a bill
export async function captureReading(req, res) {
    try {
        let premise = await Premise.findOne({where: {premise_id: req.body.premise_id}})
        if (!premise) {
            res.status(400).json({
                success: false,
                message: 'Bill could not be created, premise not found'
            })
        }else{
            let bill = await Bill.create(req.body);
            if (bill) {
                // reset the premise consumption after capturing the reading
                premise.consumption = 0;
                await premise.save();
                await premise.reload();

                res.status(200).json({
                    success: true,
                    message: 'Bill created successfully',
                    data: bill
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Bill could not be created, bad request'
                })
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//View a bill
export async function viewBill(req, res) {
    try {
        let bill = await Bill.findOne({where: {bill_id: req.params.id}});
        if (bill) {
            res.status(200).json({
                success: true,
                message: 'Bill retrieved successfully',
                data: bill
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Bill not found.',
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

//View all bills
export async function viewAllbills(req, res) {
    try {
        let allbills = await Bill.findAll();
        if (allbills.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Bill records retrieved successfully',
                data: allbills
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No bill records found.',
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

// View Bills by premise
export async function viewBillsOnPremise(req, res) {
    try {
        let allBills = await Bill.findAll({where: {premise_id: req.params.id}});
        if (allBills.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Bill records retrieved successfully',
                data: allBills
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No Bill records found.',
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

//Delete a Bill
export async function deleteBill(req, res) {
    try{
        const bill = await Bill.findOne({where: {bill_id: req.params.id}})
        if (bill){
            await bill.destroy();

            res.status(200).json({
                success: true,
                message: 'Bill deleted successfully',
                data: bill
            })
        }else{
            res.status(404).json({
                success: false,
                message: 'Bill not found'
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