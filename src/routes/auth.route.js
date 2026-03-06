import express from 'express';
import { userRegisterController } from '../controllers/auth.controller';

const router = express.Router();


router.post('/register',userRegisterController);
export default router;