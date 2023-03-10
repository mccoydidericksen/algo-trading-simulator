const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        userCreated: String
        results: [Results]
    }

    type Results {
        _id: ID
        user: ID
        algorithm: String
        stock: String
        startDate: String
        endDate: String
        initialInvestment: Float
        finalInvestment: Float
        shares: Float
        resultCreated: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        results(username: String): [Results]
        result(_id: ID!): Results
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addResult(algorithm: String!, stock: String!, startDate: String!, endDate: String!, initialInvestment: Float!, finalInvestment: Float!, shares: Float!): Results
        removeResult(_id: ID!): Results
    }

`;

module.exports = typeDefs;