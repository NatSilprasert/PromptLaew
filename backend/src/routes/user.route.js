import express from 'express';
import { registerHandler, loginHandler } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/register', registerHandler);
userRouter.post('/login', loginHandler);

export default userRouter;