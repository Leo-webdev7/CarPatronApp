import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
        _id
        username
        email
        phonenumber
        vehicles {        
          make
          car_model
          year
          vin
          mileage
      }
    }
  }
`;

export const GET_VEHICLE = gql`
  query vehicle {
    vehicles {
        make
        car_model
        year
        vin
        mileage
    }
  }
`;

export const GET_SERVICE = gql`
  query getServices($vin: String!) {
    getServices(vin: $vin) {
        name
        serviceType
        date_performed
        mileage_performed
        cost
        description
        is_overdue
    }
  }
`;

export const GET_EXPENSES = gql`
  query getExpenses($vin: String!) {
    getExpenses(vin: $vin) {
        name
        serviceType
        date_performed
        mileage_performed
        cost
        description
        is_overdue
    }
  }
`;