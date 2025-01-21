import mongoose, { Schema, Document } from 'mongoose';

interface IService extends Document {
    id: Number,
    description: string,
    price: number,
    durationTime: number,
}

const ServicesSchema: Schema = new Schema({
    id: { type: Number, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number },
    durationTime: { type: Number },
});

const Service = mongoose.model<IService>('Service', ServicesSchema);
export default Service;
export { IService, ServicesSchema };