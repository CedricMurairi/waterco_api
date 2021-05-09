import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../models/users.model.js";

dotenv.config();

//Add a User
export async function signUp(req, res) {
    try {
        let check_user = await User.findOne({where: {email: req.body.email}});

        if (check_user){
            res.status(400).json({
                success: false,
                message: 'Email already in use',
            })
        }else{
            bcrypt.hash(req.body.password, 10).then(async (hash) => {
                let userObj = {
                    email: req.body.email,
                    password: hash,
                    name: req.body.name
                }
                let user = await User.create(userObj);
                if (user) {
                    res.status(200).json({
                        success: true,
                        message: 'User created successfully',
                        data: user
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'User could not be created, Bad request'
                    })
                }
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//View a user
export async function viewUser(req, res) {
    try {
        let user = await User.findOne({ where: { user_id: req.params.id } });
        if (user) {
            res.status(200).json({
                success: true,
                message: 'User record retrieved successfully',
                data: user
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No User records found.',
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something went wrong..."
        })
    }
}

//View all users
export async function viewAllUsers(req, res) {
    try {
        let allusers = await User.findAll();
        if (allusers.length > 0) {
            res.status(200).json({
                success: true,
                message: 'User records retrieved successfully',
                data: allusers
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No User records found.',
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

//Sign In
export async function signIn(req, res) {
    try {
        let user = await User.findOne({ where: { email: req.body.email } })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email address not found."
            })
        }
        bcrypt.compare(req.body.password, user.password).then(response => {
            if (!response) {
                return res.status(401).json({
                    success: false,
                    message: "Incorrect password."
                })
            }
            let authToken = jwt.sign({ email: user.email, user_id: user.user_id },
                process.env.AUTH_KEY, { expiresIn: "365d" });
            return res.status(200).json({
                success: true,
                message: "Authentication successful",
                user: user,
                token: authToken,
                expiresIn: 86400
            })
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//Update User record
export async function updateUser(req, res) {
    try{
        let check_user = await User.findOne({where: {email: req.body.email}});

        if (check_user){
            res.status(400).json({
                success: false,
                message: 'Email already in use',
            })
        }else{
            bcrypt.hash(req.body.password, 10).then(async (hash) => {
                let userObj = {
                    email: req.body.email,
                    password: hash,
                    name: req.body.name
                }
                let user_to_update = await User.findOne({where: {user_id: req.params.id}});

                if (user_to_update) {
                    user_to_update.name = userObj.name;
                    user_to_update.email = userObj.email;
                    user_to_update.password = userObj.hash;

                    await user_to_update.save();
                    await user_to_update.reload();

                    res.status(200).json({
                        success: true,
                        message: 'User updated successfully',
                        data: user
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'User could not be updated, Bad request'
                    })
                }
            });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        }) 
    }
}

//Delete a User
export async function deleteUser(req, res) {
    try{
        const user = await User.findOne({where: {user_id: req.params.id}})
        if (user){
            await user.destroy();

            res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                data: user
            })
        }else{
            res.status(404).json({
                success: false,
                message: 'User not found'
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