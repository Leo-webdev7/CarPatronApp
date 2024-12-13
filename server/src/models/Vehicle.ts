import { Types, Schema, model, type Document } from 'mongoose';
import { IService, ServiceSchema } from './Service.js';

export interface IVehicle extends Document {
  vin: string;
  make: string;
  car_model: string;
  year: string;
  services: Types.DocumentArray<IService>;
}

const VehicleSchema = new Schema<IVehicle>({
  vin: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  car_model: {
    type: String,
    required: true
  },
  services: {
    type: [ServiceSchema],
    default: []
  },
});

const Vehicle = model('Vehicle', VehicleSchema);

export { VehicleSchema }
export default Vehicle;