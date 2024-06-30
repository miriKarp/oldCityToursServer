import mongoose, { Schema, Document } from 'mongoose';

interface ITour extends Document {
    id: Number,
    time: Date,
    invitingName: String,
    phone: String,
    note: String,
    group: Boolean,
    tourType: ToursTypes,
}

const TourSchema: Schema = new Schema({
    id: { type: Number, required: true, unique: true },
    time: { type: Date, required: true },
    invitingName: { type: String, required: true },
    phone: { type: String, unique: true },
    note: { type: String, },
    group: { type: Boolean, },
    tourType: { type: ToursTypes, required: true },
});

const Tour = mongoose.model<ITour>('User', TourSchema);
export default Tour;
export { ITour };
