import { Types, Schema, model, type Document } from 'mongoose';
import { IVehicle, VehicleSchema } from './Vehicle.js';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  phonenumber: string;
  vehicles: Types.DocumentArray<IVehicle>;
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: false,
    },
    phonenumber: {
      type: String,
      required: true,
      unique: false,
    },
    vehicles: [{
      type: Schema.Types.ObjectId,
      ref: 'Vehicle'
    }]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// hash user passwords for seed data 
userSchema.pre('insertMany', async function (next, docs) {
  const saltRounds = 10;
  for (let doc of docs) {
    if (doc.password)
      doc.password = await bcrypt.hash(doc.password, saltRounds);
  }
  next();

});

// Pre-hook to handle vehicles and services creation
userSchema.pre('save', async function (next) {
  if (this.isModified('vehicles')) {
    const vehiclePromises = this.vehicles.map(async (vehicle: any) => {
      const servicePromises = vehicle.services.map(async (service: any) => {
        const newService = await service.create(service);
        return newService._id;
      });

      const serviceIds = await Promise.all(servicePromises);
      const newVehicle = await vehicle.create({
        ...vehicle,
        services: serviceIds,
      });

      return newVehicle._id;
    });

    const vehicleIds = await Promise.all(vehiclePromises);
    this.vehicles = vehicleIds as unknown as Types.DocumentArray<IVehicle>;  
  }
  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<UserDocument>('User', userSchema);

export default User;
