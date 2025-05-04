import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '~src/svc/modules/auth/types';

export interface AuthRequest extends Request {
    user?: IUser;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      req.user = { id: decoded.userId } as IUser;
      return next();
    } catch {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }

  return res.status(401).json({ message: 'No token provided' });
};
