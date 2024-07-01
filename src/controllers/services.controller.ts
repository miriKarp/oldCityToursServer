import { Request, Response } from 'express';
import Service, { IService } from '../models/Service.nodel';
import Business from '../models/Business.model';

export const addService = async (req: Request, res: Response) => {
    const { description, price, durationTime } = req.body;
    try {

        const business = await Business.findOne();

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        const newService: IService = new Service({ id: business.services.length + 1, description, price, durationTime });

        business.services.push(newService);

        await business.save();

        res.status(201).json(newService);

    } catch (error) {
        res.status(500).json({ message: 'Server error ====' + error });
    }
}

export const updateService = async (req: Request, res: Response) => {
    const { id, description, price, durationTime } = req.body;
    try {
        const business = await Business.findOne();
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        const services: IService[] = business.services as IService[];
        if (!services || !Array.isArray(services)) {
            return res.status(500).json({ message: 'Services array not properly initialized' });
        }

        const service = services.find((service: IService) => service.id === id);
        if (!service) {
            return res.status(404).json({ message: 'service not found' });
        }

        service.description = description;
        service.price = price;
        service.durationTime = durationTime;

        await business.save();

        res.status(201).json(service);

    } catch (error) {
        res.status(500).json({ message: 'Server error ====' + error });

    }


}


export const deleteService = async (req: Request, res: Response) => {
    const { serviceId } = req.params;
    const parsedServiceId = parseInt(serviceId, 10);

    try {
        const business = await Business.findOne();
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        const serviceIndex = business.services.findIndex((service: IService) => service.id === parsedServiceId);

        if (serviceIndex === -1) {
            return res.status(404).json({ message: 'Service not found in business' });
        }

        business.services.splice(serviceIndex, 1);

        await business.save();

        res.status(201).json({ message: 'Service deleted successfully', business });

    } catch (error) {
        res.status(500).json({ message: 'Failed to delete service' });
    }
};


