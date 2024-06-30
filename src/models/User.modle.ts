import mongoose, { Schema, Document } from 'mongoose';
import Tour, { ITour } from './Tour.modle';

interface IUser extends Document {
    name: string,
    password: string
    email: string,
    phone: string,
    toursList: ITour[],
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    toursList: [{ type: Schema.Types.ObjectId, ref: 'Tour', required: true }],
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
export { IUser };

