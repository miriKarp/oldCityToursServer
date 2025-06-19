import mongoose, { Schema, Document, Types } from 'mongoose';
import Tour, { ITour } from './Tour.model';

interface IUser extends Document {
    name: string,
    password: string
    email: string,
    phone: string,
    isManager: boolean,
    toursList: Types.ObjectId[],
    managerId?: mongoose.Types.ObjectId;
    users?: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    isManager: { type: Boolean, require: true },
    toursList: [{ type: Schema.Types.ObjectId, ref: 'Tour', required: true }],
    managerId: { type: Schema.Types.ObjectId, ref: 'User' },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
export { IUser, UserSchema };

