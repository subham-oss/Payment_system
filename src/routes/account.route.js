import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createAccountController,getUserAccountsController, getAccountBalanceController } from "../controllers/account.controller.js";
const accountrouter = express.Router();

accountrouter.post("/",authMiddleware, createAccountController);

accountrouter.get("/",authMiddleware,getUserAccountsController)

accountrouter.get("/balance/:AccountId",authMiddleware,getAccountBalanceController)

export default accountrouter;