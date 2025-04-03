import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_VERY_SECRET_KEY';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
    return; 
  }

  const token = authHeader.split(' ')[1]; 
  if (!token) {
    res.status(401).json({ message: 'Invalid token' });
    return 
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Failed to authenticate token' });
      return 
    }
    
    (req as any).user = decoded; 
    next();
  });
};


