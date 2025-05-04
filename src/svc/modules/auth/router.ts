import express, {RequestHandler} from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { AppUser } from '~src/svc/modules/auth/entities/user';
import { authenticateJWT, AuthRequest } from '~src/svc/modules/auth/middleware';

export const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const user = req.user as AppUser;
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
});

authRouter.get(
    "/me",
    authenticateJWT as RequestHandler, // ✅ middleware
    ((req, res) => {
      const user = (req as AuthRequest).user;
      if (!user) return res.status(401).json({ message: "Unauthorized" });
  
      res.json({
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
      });
    }) as RequestHandler // ✅ handler
  );

