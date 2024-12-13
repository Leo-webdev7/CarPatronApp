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
  query service {
    services {
        name
        date_performed
        mileage
        const
        is_overdue
    }
  }
`;