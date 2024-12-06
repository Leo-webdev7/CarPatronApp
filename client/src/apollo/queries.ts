import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
        _id
        username
        email
        phonenumber
        # vehicles {
        #   _id
        #   model
        # }
    }
  }
`;

export const GET_VEHICLE = gql`
  query vehicle {
    vehicle {
        _id
        make
        model
        year
        vin
        mileage
        # vehicles {
        #   _id
        #   model
        # }
    }
  }
`;