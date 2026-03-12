import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createAccountController } from "../controllers/account.controller.js";
const accountrouter = express.Router();

accountrouter.post("/",authMiddleware, createAccountController);

export default accountrouter;