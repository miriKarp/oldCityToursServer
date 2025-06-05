import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User, { IUser } from '../models/User.modle';

dotenv.config();

export interface AuthRequest extends Request {
    user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

        const user = await User.findById((decoded as any).userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed. error: ' + error });
    }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
    if (!req.user || !req.user.isManager ) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();} catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed. error: ' + error  });
    }
};
