import { gql } from '@apollo/client';

export const QUERY_RESULTS = gql`
    query results($userId: ID!) {
        results(userId: $userId) {
            _id
            algorithm
            stock
            startDate
            initialInvestment
            finalInvestment
            resultCreated
        }
    }
`;
