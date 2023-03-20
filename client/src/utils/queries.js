import { gql } from '@apollo/client';

export const QUERY_RESULTS = gql`
    query results {
        results {
            _id
            algorithm
            stock
            startDate
            endDate
            initialInvestment
            finalInvestment
            shares
            resultCreated
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            resultCount
            results {
                _id
                algorithm
                stock
                startDate
                endDate
                initialInvestment
                finalInvestment
                shares
                resultCreated
            }
        }
    }
`;