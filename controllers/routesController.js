import Route from "../models/routes.model.js";

//Add a Route
export async function createRoute(req, res) {
    try {
        let route = await Route.create(req.body);
        if (route) {
            res.status(200).json({
                success: true,
                message: 'Route created successfully',
                data: route
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Route could not be created, bad request'
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

//View a Route
export async function viewRoute(req, res) {
    try {
        let route = await Route.findOne({where: {route_id: req.params.id}});
        if (route) {
            res.status(200).json({
                success: true,
                message: 'Route retrieved successfully',
                data: route
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Route not found.',
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

//View all Routes
export async function viewAllRoutes(req, res) {
    try {
        let allRoutes = await Route.findAll();
        if (allRoutes.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Route records retrieved successfully',
                data: allRoutes
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No Route records found.',
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

//Update Route record
export async function updateRoute(req, res) {
    try{
        const route = await Route.findOne({where: {route_id: req.params.id}});
        if (route){
            if (req.body.name && req.body.name !== route.name){route.name = req.body.name;}
            if (req.body.active && req.body.active !== route.active){route.active = req.body.active}
            
            await route.save();
            await route.reload();

            res.status(200).json({
                success: true,
                message: 'Route updated successfully',
                data: route
            })
        }else{
            res.status(404).json({
                success: false,
                message: 'Route not found',
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

//Delete a Route
export async function deleteRoute(req, res) {
    try{
        const route = await Route.findOne({where: {route_id: req.params.id}})
        if (route){
            await route.destroy();

            res.status(200).json({
                success: true,
                message: 'Route deleted successfully',
                data: route
            })
        }else{
            res.status(404).json({
                success: false,
                message: 'Route not found'
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