const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    phonenumber: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    phonenumber: String
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