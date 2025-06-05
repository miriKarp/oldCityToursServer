import mongoose, { Schema, Document } from 'mongoose';

interface IService extends Document {
    _id: mongoose.Types.ObjectId;
    description: string,
    price: number,
    durationTime: number,
    business: mongoose.Schema.Types.ObjectId,
}

const ServicesSchema: Schema = new Schema({
    description: { type: String, required: true },
    price: { type: Number },
    durationTime: { type: Number },
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
}, { _id: true });

const Service = mongoose.model<IService>('Service', ServicesSchema);
export default Service;
export { IService, ServicesSchema };