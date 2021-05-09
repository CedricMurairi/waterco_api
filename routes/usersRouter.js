
import express from "express";
import { updateUser, signUp, viewAllUsers, viewUser, signIn, deleteUser } from '../controllers/usersController.js'
import { authenticate } from '../middlewares/auth.js';

const usersRouter = express.Router();


// Sign Up - No Auth.
usersRouter.post("/signup", signUp);

// Sign In - No Auth
usersRouter.post("/signin", signIn);

// Update User users/:id
usersRouter.put("/:id", updateUser);

// Delete User users/:id
usersRouter.delete("/:id", deleteUser);

//View a User users/:id - Authenticate.
usersRouter.get("/:id", viewUser);

//View all Users users/ - Authenticate.
usersRouter.get("/", viewAllUsers);


export default usersRouter;