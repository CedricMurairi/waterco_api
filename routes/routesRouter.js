import express from "express";
import { createRoute, viewAllRoutes, updateRoute, viewRoute, deleteRoute } from "../controllers/routesController.js";

const routesRouter = express.Router();

// Create a new route routes/
routesRouter.post("/", createRoute);

// View route routes/:id
routesRouter.get("/:id", viewRoute);

// View all routes records routes/
routesRouter.get("/", viewAllRoutes);

// Update a route record routes/:id
routesRouter.put("/:id", updateRoute);

// Delete route routes/:id
routesRouter.delete("/:id", deleteRoute);

export default routesRouter;