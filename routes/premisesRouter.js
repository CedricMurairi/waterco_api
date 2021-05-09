import express from "express";
import { addPremise, viewPremise, viewAllPremises, updatePremise, viewMemberPremises, viewPremisesOnRoute, deletePremise } from '../controllers/premisesController.js'

const premisesRouter = express.Router();

// Add a premise premises/
premisesRouter.post("/", addPremise);

// View a premise premises/:id
premisesRouter.get("/:id", viewPremise);

// View all premises premises/
premisesRouter.get("/", viewAllPremises);

// View premise record premises/:id
premisesRouter.put("/:id", updatePremise);

// View member premises premises/premises/:id
premisesRouter.get("/member/:id", viewMemberPremises);

// Delete premise premise/:id
premisesRouter.delete("/:id", deletePremise)

// View route premises premises/route/:id
premisesRouter.get("/route/:id", viewPremisesOnRoute)

export default premisesRouter;