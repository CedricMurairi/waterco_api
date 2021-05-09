import Premise from "../models/premises.model.js";


//Add a Premise
export async function addPremise(req, res) {
    try {
        let premise = await Premise.create(req.body);
        if (premise) {
            res.status(200).json({
                success: true,
                message: 'Premise created successfully',
                data: premise
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Premise could not be created, bad request'
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

//View a Premise
export async function viewPremise(req, res) {
    try {
        let premise = await Premise.findOne({where: {premise_id: req.params.id}});
        if (premise) {
            res.status(200).json({
                success: true,
                message: 'Premise retrieved successfully',
                data: premise
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Premise not found.',
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

//View all Premises
export async function viewAllPremises(req, res) {
    try {
        let allPremises = await Premise.findAll();
        if (allPremises.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Premise records retrieved successfully',
                data: allPremises
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No Premise records found.',
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

export async function viewPremisesOnRoute(req, res) {
    try {
        let allPremises = await Premise.findAll({where: {route_supplying: req.params.id}});
        if (allPremises.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Premise records retrieved successfully',
                data: allPremises
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No Premise records found.',
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

export async function viewMemberPremises(req, res) {
    try {
        let allPremises = await Premise.findAll({where: {owner: req.params.id}});
        if (allPremises.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Premise records retrieved successfully',
                data: allPremises
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No Premise records found.',
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

//Update Premise record
export async function updatePremise(req, res) {
    try{
        const premise = await Premise.findOne({where: {premise_id: req.params.id}});
        if (premise){
            if (req.body.name && req.body.name !== premise.name){premise.name = req.body.name;}
            if (req.body.owner && req.body.owner !== premise.owner){premise.owner = req.body.owner;}
            if (req.body.active && req.body.active !== premise.active){premise.active = req.body.active;}
            if (req.body.route_supplying && req.body.route_supplying !== premise.route_supplying){premise.route_supplying = req.body.route_supplying;}
            if (req.body.consumption && req.body.consumption !== premise.consumption){premise.consumption = req.body.consumption;}            
            
            await premise.save();
            await premise.reload();

            res.status(200).json({
                success: true,
                message: 'Premise updated successfully',
                data: premise
            })
        }else{
            res.status(404).json({
                success: false,
                message: 'Premise not found',
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        }) 
    }
}

//Delete a Premise
export async function deletePremise(req, res) {
    try{
        const premise = await Premise.findOne({where: {premise_id: req.params.id}})
        if (premise){
            await premise.destroy();

            res.status(200).json({
                success: true,
                message: 'Premise deleted successfully',
                data: premise
            })
        }else{
            res.status(404).json({
                success: false,
                message: 'Premise not found'
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