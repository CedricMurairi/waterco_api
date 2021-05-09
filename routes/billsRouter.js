import express from "express";
import { captureReading, viewAllbills, viewBill, deleteBill, viewBillsOnPremise } from '../controllers/billsController.js'

const billsRouter = express.Router();

//Add a capture bill bills/
billsRouter.post("/", captureReading);

//View a bill bills/:id
billsRouter.get("/:id", viewBill);

// View all bills bills/
billsRouter.get("/", viewAllbills);

// Delete a bill bills/:id
billsRouter.delete("/:id", deleteBill);

// View bills on Premise bills/premise/:id
billsRouter.get("/premise/:id", viewBillsOnPremise)

export default billsRouter;