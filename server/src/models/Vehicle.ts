import { Types, ObjectId, Schema, model, type Document } from 'mongoose';
import { IService, ServiceSchema } from './Service';

export interface IVehicle extends Document {
  vin: string;
  make: string;
  model: string;
  year: string;
  services: Types.DocumentArray<IService>;

  // We need the following fields to fully implement the Document interface
  _id: ObjectId; // Explicitly include _id
  createdAt?: Date; // Include createdAt if timestamps are enabled
  updatedAt?: Date; // Include updatedAt if timestamps are enabled
}

const VehicleSchema = new Schema<IVehicle>({
  vin: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  services: {
    type: [ServiceSchema],
    default: [],
  },
});

const Vehicle = model<IVehicle>('Vehicle', VehicleSchema);

export { VehicleSchema }
export default Vehicle;