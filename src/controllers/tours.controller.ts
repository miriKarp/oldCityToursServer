import { Request, Response } from 'express';
import Tour, { ITour } from '../models/Tour.modle';
import { ToursTypes } from '../enums/ToursTypes';

export const getTours = async (req: Request, res: Response) => {

    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export const addTour = async (req: Request, res: Response) => {
    const { time, invitingName, phone, note, group, tourType } = req.body;
    try {
        const existingTour = await Tour.findOne({ time });
        if (existingTour) {
            return res.status(400).json({ message: 'Tour already exists in this time' });
        }
        if (!Object.values(ToursTypes).includes(tourType)) {
            return res.status(400).json({ message: 'Invalid tourType value' });
        }
        const lastTour = await Tour.findOne().sort({ id: -1 }).limit(1);
        const nextId = lastTour ? lastTour.id + 1 : 1;

        const newTour: ITour = new Tour({ nextId, time, invitingName, phone, note, group, tourType });
        await newTour.save();
        res.status(201).json('Tour added')
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
}

export const updateTour = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    const { time, invitingName, phone, note, group, tourType } = req.body;

    try {
        if (!Object.values(ToursTypes).includes(tourType)) {
            return res.status(400).json({ message: 'Invalid tourType value' });
        }

        const updatedTour = await Tour.findOneAndUpdate(
            { id },
            { time, invitingName, phone, note, group, tourType },
            { new: true, runValidators: true }
        );

        if (!updatedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        res.status(200).json(updatedTour);
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
};



export const deleteTour = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    try {
        const deletedTour = await Tour.findOneAndDelete({ id });

        if (!deletedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        res.status(200).json({ message: 'Tour deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
};


