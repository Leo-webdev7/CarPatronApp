import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username password: $password) {
      token
      User {
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
            vehicles {
              make
              model
              year
              vin
              mileage
            }
        }
    }
  }
`;

export const ADD_VEHICLE = gql`
  mutation addVehicle($input: VehicleInput!) {
    addVehicle(input: $input) {
          _id
          username
          email
          phonenumber
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