import express from "express";
import paymentsRouter from "./paymentsRouter.js";
import routesRouter from "./routesRouter.js";
import billsRouter from "./billsRouter.js";
import membersRouter from "./membersRouter.js";
import premisesRouter from "./premisesRouter.js";
import usersRouter from "./usersRouter.js";


const router = express.Router();

router.use("/payments", paymentsRouter);
router.use("/routes", routesRouter);
router.use("/bills", billsRouter);
router.use("/premises", premisesRouter);
router.use("/members", membersRouter);
router.use("/users", usersRouter);

export default router;