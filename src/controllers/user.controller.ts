import { Request, Response } from 'express';
import User, { IUser } from "../models/User.model";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Business from '../models/Business.model';
import { AuthRequest } from '../middlewares/users.middleware';

dotenv.config();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export const getUserTours = async (req: AuthRequest, res: Response) => {
    try {
        const userWithTours = await User.findById(req.user!._id).populate({
            path: 'toursList',
            populate: { path: 'tourType' }
        });

        if (!userWithTours || !userWithTours.toursList || userWithTours.toursList.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(userWithTours.toursList);
    } catch (error) {
        console.error('Failed to get user tours', error);
        res.status(500).json({ message: 'שגיאה בטעינת סיורי המשתמש' });
    }
};

export const SignUp = async (req: Request, res: Response) => {

    try {
        const { name, password, email, phone } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        let isManager = false;
        let managerId = null;

        if (email === 'excitingtours100@gmail.com') {
            isManager = true;
        } else {
            const manager = await User.findOne({ email: 'excitingtours100@gmail.com' });
            if (!manager) {
                return res.status(400).json({ message: 'Manager not found' });
            }
            managerId = manager._id;
        }

        const newUser: IUser = new User({ name, password: hashedPassword, email, phone, isManager, managerId });

        await newUser.save();

        if (managerId) {
            await Business.updateOne({}, { $addToSet: { users: newUser._id } });
        }

        const token = jwt.sign({
            userId: newUser._id, name: newUser.name, email: newUser.email, phone: newUser.phone
        },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' })

        res.status(201).json({
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                isManager: newUser.isManager
            }
        });


    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
}

export const SignIn = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });
        const name = user?.name;
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid details' });
        }
        const token = jwt.sign({
            userId: user._id, name: user.name, email: user.email, phone: user.phone
        },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        )
        res.status(200).json({ token, user: { ...user.toObject(), isManager: user.isManager } });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

}