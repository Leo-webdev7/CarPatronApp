import { Schema, model, type Document } from 'mongoose';

export interface ITech extends Document {
  name: string;
}

const techSchema = new Schema<ITech>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Tech = model('Tech', techSchema);

export default Tech;
