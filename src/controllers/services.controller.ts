import { Request, Response } from 'express';
import Service, { IService } from '../models/Service.model';
import Business from '../models/Business.model';
import mongoose from 'mongoose';

export const getServices = async (req: Request, res: Response) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export const addService = async (req: Request, res: Response) => {
    const { description, price, durationTime } = req.body;

    try {
        const business = await Business.findOne();

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        const newService = new Service({
            description,
            price,
            durationTime,
            business: business._id
        });

        await newService.save();

        if (!Array.isArray(business.services)) {
            business.services = [];
        }

        business.services.push(newService._id);

        await business.save();

        res.status(201).json(newService);

    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
}


export const updateService = async (req: Request, res: Response) => {
    const { _id, description, price, durationTime } = req.body;
    console.log('id:', _id, 'description:', description, 'price:', price, 'durationTime:', durationTime);
    

    try {
        const service = await Service.findById(_id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        if (typeof description === 'string') {
            service.description = description;
        }
        if (typeof price === 'number') {
            service.price = price;
        }
        if (typeof durationTime === 'number') {
            service.durationTime = durationTime;
        }

        await service.save();

        res.status(200).json(service);

    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
};

export const deleteService = async (req: Request, res: Response) => {
    const { serviceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        return res.status(400).json({ message: 'Invalid service ID' });
    }

    try {
        const serviceToDelete = await Service.findById(serviceId);
        if (!serviceToDelete) {
            return res.status(404).json({ message: 'Service not found.' });
        }

        const business = await Business.findById(serviceToDelete.business);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        await Service.findByIdAndDelete(serviceId);

        business.services = business.services.filter(
            (id: mongoose.Types.ObjectId) => id.toString() !== serviceId
        );

        await business.save();

        res.status(200).json({ message: 'Service deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Failed to delete service' });
    }
};