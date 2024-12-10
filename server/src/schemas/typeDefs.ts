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

type Query {
me: User
}

type Mutation {
login(username: String!, password: String!): Auth
addUser(input: UserInput!): Auth
}

`;

export default typeDefs;