import express, { Request, Response } from "express";
import { BadRequestResponse, FailureMsgResponse, SuccessResponse } from "../../core/response";
import { findByEmail } from "../../database/repositories/user";
import asyncHandler from "../../helpers/asyncHandler";
import { LogIn, SignUp } from "../../app/auth";
import jwt from 'jsonwebtoken';
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_VERY_SECRET_KEY';

router.post('/signup', asyncHandler(async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            new BadRequestResponse('Email and password are required').send(res);
            return;
        }

        const newUser = await SignUp({ email, password });
        new SuccessResponse('User created successfully', { user: newUser, }).send(res);

    } catch (err) {
        throw err
    }
}))

router.post('/login', asyncHandler(async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            new BadRequestResponse('Email and password are required').send(res);
            return;
        }

        const user = await findByEmail(email);

        if (!user) {
            new FailureMsgResponse('User not found').send(res);
            return;
        }

        const isPasswordValid = await LogIn({ email, password });

        if (!isPasswordValid) {
            new BadRequestResponse('Invalid credentials').send(res);
            return;
        }
        const token = jwt.sign(
            { email: user.email },
            JWT_SECRET,
            { expiresIn: '10h' }
        );
        new SuccessResponse('User logged in successfully', { email: user.email, token, }).send(res);

    } catch (err) {
        throw err;
    }
}));


export default router;