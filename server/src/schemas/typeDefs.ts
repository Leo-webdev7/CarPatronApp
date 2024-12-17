const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    phonenumber: String
    vehicles: [Vehicle]
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    phonenumber: String
    vehicles: [VehicleInput]
  }

  type Vehicle {
    _id: ID!
    vin: String!
    make: String!
    car_model: String!
    year: String!
    mileage: Int
    services: [Service]
  }

  input VehicleInput {
    vin: String!
    make: String!
    car_model: String!
    year: String!
    mileage: Int
    services: [ServiceInput]
  }

  enum ServiceType {
    SERVICE
    EXPENSE
  }

  type Service {
    name: String!
    serviceType: ServiceType!
    date_performed: String!
    mileage_performed: Int
    cost: Float
    description: String
    is_overdue: Boolean
  }

  input ServiceInput {
    vin: String!
    name: String!
    serviceType: ServiceType!
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
    getUser(username: String!): User
    getVehicles: [Vehicle]
    getVehicle: Vehicle
    getServices(vin: String!): [Service]
    getExpenses(vin: String!): [Service]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    addVehicle(input: VehicleInput!): User
    addService(input: ServiceInput!): User
  }

`;

    // getExpenses(vehicle_id: ID!): [Service]
    // getServices(vehicle_id: ID!): [Service]

export default typeDefs;