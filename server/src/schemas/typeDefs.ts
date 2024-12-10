const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    phonenumber: String
    vehicles: [Vehicle]!
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
    date_performed: String!
    mileage_performed: Int
    cost: Float
    description: String
    is_overdue: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type Service {
    name: String!
    date_performed: String
    mileage_performed: Int
    cost: Float
    is_overdue: Boolean
  }
  type Query {
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
  }

`;

export default typeDefs;