import { Schema, model, type Document } from 'mongoose';

export interface IService extends Document {
  name: string,
  serviceType: 'SERVICE' | 'EXPENSE',
  date_performed: Date,
  mileage_performed: number,
  cost: number,
  description: string,
  is_overdue: boolean
}

const ServiceSchema = new Schema<IService>({
    name: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true,
        enum: ['SERVICE', 'EXPENSE'], // Only allow 'service' or 'expense'
    },
    date_performed: {
        type: Date,
        required: true
    },
    mileage_performed: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    is_overdue: {
        type: Boolean,
        required: false
    }
});

const Service = model('Service', ServiceSchema);

export { ServiceSchema }
export default Service;
