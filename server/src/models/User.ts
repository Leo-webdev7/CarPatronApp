import { Types, ObjectId, Schema, model, type Document } from 'mongoose';
import { IVehicle, VehicleSchema } from './Vehicle';

export interface IUser extends Document {
  _id: ObjectId;
  email: string;
  username: string;
  password: string;
  vehicles: Types.DocumentArray<IVehicle>;
}

const UserSchema = new Schema<IUser>({
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  vehicles: {
    type: [VehicleSchema],
    default: [],
  },
});

const User = model('User', UserSchema);

export default User;
