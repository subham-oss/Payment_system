import express from 'express';
import { userRegisterController,userLoginController,userLogoutController } from '../controllers/auth.controller.js';

const authrouter = express.Router();


authrouter.post('/register',userRegisterController);
authrouter.post('/login',userLoginController);
authrouter.post('/logout',userLogoutController);
export default authrouter;