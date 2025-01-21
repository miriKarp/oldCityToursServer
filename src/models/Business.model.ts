import mongoose, { Schema, Document } from 'mongoose';
import { IService, ServicesSchema } from './Service.model';
import { IUser, UserSchema } from './User.modle';

interface IBusiness extends Document {
    manager: string,
    password: string,
    email: string,
    phone: String,
    services: IService[],
    users: IUser[],
}

const BusinessSchema: Schema = new Schema({
    manager: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    phone: { type: String, unique: true },
    email: { type: String, unique: true, required: true },
    services: { type: [ServicesSchema] },
    users: { type: [UserSchema] },
});

BusinessSchema.statics.createInstance = async function (businessData: Partial<IBusiness>) {
    const existingBusiness = await this.findOne();
    if (existingBusiness) {
        throw new Error('A business instance already exists');
    }
    const business = new this(businessData);
    return business.save();
};

const Business = mongoose.model<IBusiness>('Business', BusinessSchema) as typeof mongoose.Model & {
    createInstance(businessData: Partial<IBusiness>): Promise<IBusiness>;
};

export default Business;
export { IBusiness };
