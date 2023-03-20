import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RESULT = gql`
  mutation addResult(
    $algorithm: String!
    $stock: String!
    $startDate: String!
    $initialInvestment: Float!
    $finalInvestment: Float!
    $user: ID!
  ) {
    addResult(
      algorithm: $algorithm
      stock: $stock
      startDate: $startDate
      initialInvestment: $initialInvestment
      finalInvestment: $finalInvestment
      user: $user
    ) {
      _id
      user
    }
  }
`;
