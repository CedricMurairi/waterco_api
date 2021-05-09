import express from "express";
import { addMember, viewAllMembers, viewMember, updateMember, deleteMember } from '../controllers/membersController.js'

const membersRouter = express.Router();

//Add a member members/
membersRouter.post("/", addMember);

//View a member members/:id
membersRouter.get("/:id", viewMember);

//View all members members/
membersRouter.get("/", viewAllMembers);

//Update member record members/:id
membersRouter.put("/:id", updateMember);

//Delete a member members/:id
membersRouter.delete("/:id", deleteMember);

export default membersRouter;