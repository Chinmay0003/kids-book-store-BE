import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { AuthRequest } from "~src/svc/modules/auth/middleware";
import { IUser } from "~src/svc/modules/auth/types";

export const googleCallback = async (
    req: AuthRequest,
    res: Response,
    _next: NextFunction,
) => {
    const user = req.user as IUser;
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
}

export const getMe = async (
    req: AuthRequest,
    res: Response,
    _next: NextFunction,
) => {
    const user = (req as AuthRequest).user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    res.json({
    name: user.name,
    email: user.email,
    photoUrl: user.photoUrl,
    });
};