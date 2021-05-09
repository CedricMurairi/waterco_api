import Member from "../models/members.model.js";


//Add a Member
export async function addMember(req, res) {
    try {
        let member = await Member.create(req.body);
        if (member) {
            res.status(200).json({
                success: true,
                message: 'Member created successfully',
                data: member
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Member could not be created, bad request'
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

//View a Member
export async function viewMember(req, res) {
    try {
        let member = await Member.findOne({where: {member_id: req.params.id}});
        if (member) {
            res.status(200).json({
                success: true,
                message: 'Member retrieved successfully',
                data: member
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Member not found.',
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

//View all Members
export async function viewAllMembers(req, res) {
    try {
        let allMembers = await Member.findAll();
        if (allMembers.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Member records retrieved successfully',
                data: allMembers
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No Member records found.',
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

//Update Member record
export async function updateMember(req, res) {
    try{
        const member = await Member.findOne({where: {member_id: req.params.id}});
        if (member){
            if (req.body.name && req.body.name !== member.name){member.name = req.body.name;}
            if (req.body.email && req.body.email !== member.email){member.email = req.body.email;}
            if (req.body.phone && req.body.phone !== member.phone){member.phone = req.body.phone;}
            
            await member.save();
            await member.reload();

            res.status(200).json({
                success: true,
                message: 'Member updated successfully',
                data: member
            })
        }else{
            res.status(404).json({
                success: false,
                message: 'Member not found',
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

//Delete a Member
export async function deleteMember(req, res) {
    try{
        const member = await Member.findOne({where: {member_id: req.params.id}})
        if (member){
            await member.destroy();

            res.status(200).json({
                success: true,
                message: 'Member deleted successfully',
                data: member
            })
        }else{
            res.status(404).json({
                success: false,
                message: 'Member not found'
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