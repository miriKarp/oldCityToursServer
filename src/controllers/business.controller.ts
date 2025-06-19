import { Request, Response } from 'express';
import Business, { IBusiness } from '../models/Business.model';

export const createBusiness = async (req: Request, res: Response) => {
    const { manager, password, email, phone } = req.body;

    try {
        const newBusiness: IBusiness = await Business.createInstance({ manager, password, email, phone });
        res.status(201).json(newBusiness);

    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
}

export const updateBusiness = async (req: Request, res: Response) => {

    const { manager, password, email, phone } = req.body;
    try {
        const business = await Business.findOne();

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        if (manager != "string") {
            business.manager = manager;
        }
        if (password != "string") {
            business.password = password;
        }
        if (email != "string") {
            business.email = email;
        }
        if (phone != "string") {
            business.phone = phone;
        }

        await business.save();

        res.status(201).json(business);

    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
};



