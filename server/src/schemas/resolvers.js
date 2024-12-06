import Tech from '../models/Tech.js';
import Matchup from '../models/Matchup.js';
const resolvers = {
    Query: {
        tech: async () => {
            return Tech.find({});
        },
        matchups: async (_parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Matchup.find(params);
        },
    },
    Mutation: {
        createMatchup: async (_parent, args) => {
            const matchup = await Matchup.create(args);
            return matchup;
        },
        createVote: async (_parent, { _id, techNum }) => {
            const vote = await Matchup.findOneAndUpdate({ _id }, { $inc: { [`tech${techNum}_votes`]: 1 } }, { new: true });
            return vote;
        },
    },
};
export default resolvers;
