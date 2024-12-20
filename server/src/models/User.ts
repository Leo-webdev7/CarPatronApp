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
      vehicles: [VehicleSchema]
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

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<UserDocument>('User', userSchema);

export default User;
