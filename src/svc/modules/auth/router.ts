import express, {RequestHandler} from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { getMe, googleCallback } from '~src/svc/modules/auth/controller';
import { AppUser } from '~src/svc/modules/auth/entities/user';
import { authenticateJWT, AuthRequest } from '~src/svc/modules/auth/middleware';

export const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', passport.authenticate('google', { session: false }), googleCallback as RequestHandler);
authRouter.use(authenticateJWT as RequestHandler);
authRouter.get(
    "/me",
    getMe as RequestHandler
);

