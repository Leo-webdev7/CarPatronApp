import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
        _id
        username
        email
        phonenumber
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
    }
  }
`;

export const GET_EXPENSE = gql`
  query expense {
    expense {
        _id
        name
        date_performed
        mileage
        const
        is_overdue
    }
  }
`;