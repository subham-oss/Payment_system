import { Router } from "express";
import { authMiddleware,authsystemUserMiddleware } from "../middleware/auth.middleware.js";
import { createTransaction,createInitialFunds } from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.post("/", authMiddleware, createTransaction);

transactionRouter.post("/system/initial-funds", authsystemUserMiddleware,createInitialFunds);


export default transactionRouter;