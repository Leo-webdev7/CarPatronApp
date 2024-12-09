const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    phonenumber: String
    vehicles: [Vehicle]!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    phonenumber: String
  }

  type Vehicle {
    vin: String!
    make: String!
    car_model: String!
    year: String!
    services: [Service]
  }

  input VehicleInput {
    vin: String!
    make: String!
    car_model: String!
    year: String!
  }

  type Service {
    name: String!
    date_performed: String!
    mileage_performed: Int
    cost: Float
    description: String
    is_overdue: Boolean
  }

  input ServiceInput {
    name: String!
    date_performed: String!
    mileage_performed: Int
    cost: Float!
    description: String
    is_overdue: Boolean
  }

  type Auth {
    token: ID!
    user: User
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