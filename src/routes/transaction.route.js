import { Router } from "express";
import { authMiddleware,authsystemUserMiddleware } from "../middleware/auth.middleware.js";
import { createTransaction,createInitialFund } from "../controllers/transaction.controller.js";

const router = Router();


const transactionRouter = Router();

transactionRouter.post("/", authMiddleware, createTransaction);

transactionRouter.post("/system/initial-funds", authsystemUserMiddleware,createInitialFund);


export default router;