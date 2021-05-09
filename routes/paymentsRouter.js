import express from "express";
import { capturePayment, viewAllPayments, viewPaymentsByPremise, deletePayment } from '../controllers/paymentsController.js'

const paymentsRouter = express.Router();

//Add a Payment payments/
paymentsRouter.post("/", capturePayment);

//View all payments payments/
paymentsRouter.get("/", viewAllPayments);

//View payments by premise payments/:id
paymentsRouter.get("/:id", viewPaymentsByPremise);

// Delete payment payment/:id
paymentsRouter.delete("/:id", deletePayment);

export default paymentsRouter;






