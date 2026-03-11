import express from 'express';
import { userRegisterController,userLoginController } from '../controllers/auth.controller.js';

const authrouter = express.Router();


authrouter.post('/register',userRegisterController);
authrouter.post('/login',userLoginController);
export default authrouter;