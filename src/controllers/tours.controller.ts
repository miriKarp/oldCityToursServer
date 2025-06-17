import { Request, Response } from 'express';
import Tour, { ITour } from '../models/Tour.modle';
import User from '../models/User.modle';
import { ToursTypes } from '../enums/ToursTypes';
import mongoose from 'mongoose';

export const getTours = async (req: AuthRequest, res: Response) => {

    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'לא מחובר' });
        }
        let tours;
        if (user.isManager) {
            tours = await Tour.find();
        } else {
            tours = await Tour.find({ _id: { $in: user.toursList } });
        }

        res.status(200).json(tours);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export const addTour = async (req: AuthRequest, res: Response) => {
    const { time, invitingName, phone, note, group, tourType } = req.body;
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const existingTour = await Tour.findOne({ time });
        if (existingTour) {
            return res.status(400).json({ message: 'Tour already exists in this time' });
        }
        if (!Object.values(ToursTypes).includes(tourType)) {
            return res.status(400).json({ message: 'Invalid tourType value' });
        }
        const lastTour = await Tour.findOne().sort({ id: -1 }).limit(1);

        const newTour: ITour = new Tour({ time, invitingName, phone, note, group, tourType });
        const savedTour = await newTour.save();

        await User.findByIdAndUpdate(
            user._id,
            { $push: { toursList: savedTour._id } },
            { new: true }
        );

        res.status(201).json({ message: 'Tour added successfully', tour: savedTour })
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
}

export const updateTour = async (req: Request, res: Response) => {

    const { _id, time, invitingName, phone, note, group, tourType } = req.body;

    try {
        if (!Object.values(ToursTypes).includes(tourType)) {
            return res.status(400).json({ message: 'Invalid tourType value' });
        }

        const updatedTour = await Tour.findOneAndUpdate(
            { _id },
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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Tour ID' });
    }
    try {

        const deletedTour = await Tour.findById(id);

        if (!deletedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        await Tour.findByIdAndDelete(id);

        res.status(200).json({ message: 'Tour deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
};