import { Schema, model, type Document } from 'mongoose';

export interface IMatchup extends Document {
  tech1: string;
  tech2: string;
  tech1_votes: number;
  tech2_votes: number;
}

const matchupSchema = new Schema<IMatchup>({
  tech1: {
    type: String,
    required: true,
  },
  tech2: {
    type: String,
    required: true,
  },
  tech1_votes: {
    type: Number,
    default: 0,
  },
  tech2_votes: {
    type: Number,
    default: 0,
  },
});

const Matchup = model('Matchup', matchupSchema);

export default Matchup;
