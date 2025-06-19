import { Request, Response } from 'express';
import Business, { IBusiness } from '../models/Business.model';

export const getBusiness = async (req: Request, res: Response) => {
    try {
        const business = await Business.findOne();

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
};

export const createBusiness = async (req: Request, res: Response) => {
    const { manager, password, email, phone, address, openingHours } = req.body;

    try {
        const newBusiness: IBusiness = await Business.createInstance({ manager, password, email, phone, address, openingHours });
        res.status(201).json(newBusiness);

    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
};

export const updateBusiness = async (req: Request, res: Response) => {

    const { manager, password, email, phone, address, openingHours } = req.body;
    try {
        const business = await Business.findOne();

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        if (typeof manager === 'string') {
            business.manager = manager;
        }
        if (typeof password === 'string') {
            business.password = password;
        }
        if (typeof email === 'string') {
            business.email = email;
        }
        if (typeof phone === 'string') {
            business.phone = phone;
        }
        if (typeof address === 'string') {
            business.address = address;
        }
        if (typeof openingHours === 'string') {
            business.openingHours = openingHours;
        }

        await business.save();

        res.status(201).json(business);

    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
};