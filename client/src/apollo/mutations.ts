import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADDUSER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
        user{
            _id
            username
            email
            phonenumber
        }
    }
  }
`;

export const ADD_VEHICLE = gql`
  mutation addVehicle($input: VehicleInput!) {
    addVehicle(input: $input) {
        vehicles {
            make
            model
            year
            vin
            mileage
          }
      }
    }
`;

export const ADD_SERVICE = gql`
  mutation addService($input: ServiceInput!) {
    addService(input: $input) {
          services {
            name
            date
            mileage_performed
            cost
            is_outdated
          }
      }
    }
`;