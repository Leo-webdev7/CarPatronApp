import Tech, { ITech } from '../models/Tech.js';
import Matchup, { IMatchup } from '../models/Matchup.js';

const resolvers = {
  Query: {
    tech: async (): Promise<ITech[] | null> => {
      return Tech.find({});
    },
    matchups: async (_parent: any, { _id }: { _id: string }): Promise<IMatchup[] | null> => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
  },
  Mutation: {
    createMatchup: async (_parent: any, args: any): Promise<IMatchup | null> => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (_parent: any, { _id, techNum }: { _id: string, techNum: number}): Promise<IMatchup | null> => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

export default resolvers;
