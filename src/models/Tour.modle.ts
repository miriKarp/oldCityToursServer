import mongoose, { Schema, Document } from 'mongoose';
// import { ToursTypes } from '../enums/ToursTypes';

interface ITour extends Document {
    _id: mongoose.Types.ObjectId;
    time: Date,
    invitingName: String,
    phone: String,
    note: String,
    group: Boolean,
    tourType: mongoose.Types.ObjectId,
}

const TourSchema: Schema = new Schema({
    time: { type: Date, required: true },
    invitingName: { type: String, required: true },
    phone: { type: String, },
    note: { type: String, },
    group: { type: Boolean, },
    tourType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
}, { _id: true });

const Tour = mongoose.model<ITour>('Tour', TourSchema);
export default Tour;
export { ITour };
