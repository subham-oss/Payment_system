import express from 'express';
import authrouter from './routes/auth.route.js';
import accountrouter from './routes/account.route.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authrouter);
app.use("/api/account", accountrouter);

export default app;