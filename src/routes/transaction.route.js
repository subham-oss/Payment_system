import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createAccountController } from "../controllers/account.controller";

const router = Router();


const transactionRouter = Router();

transactionRouter.post("/", authMiddleware, createAccountController);


export default router;