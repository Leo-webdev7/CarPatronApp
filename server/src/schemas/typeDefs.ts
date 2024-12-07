const typeDefs = `
  type User {
    _id: ID!
    email: String!
    password: String!
    vehicles: [Vehicle]
  }

  type Vehicle {
    vin: String!
    make: String!
    model: String!
    year: String!
    services: [Service]
  }

  type Service {
    name: String!
    date_performed: String
    mileage_performed: Int
    cost: Float
    is_overdue: Boolean
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
  }
`;

export default typeDefs;
