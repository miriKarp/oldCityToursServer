import mongoose, { Schema, Document } from 'mongoose';
import { ToursTypes } from '../enums/ToursTypes';

interface ITour extends Document {
    time: Date,
    invitingName: String,
    phone: String,
    note: String,
    group: Boolean,
    tourType: ToursTypes,
}

const TourSchema: Schema = new Schema({
    id: { type: Number, unique: true },
    time: { type: Date, required: true },
    invitingName: { type: String, required: true },
    phone: { type: String, },
    note: { type: String, },
    group: { type: Boolean, },
    tourType: { type: Number, required: true },
});

const Tour = mongoose.model<ITour>('Tour', TourSchema);
export default Tour;
export { ITour };
