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
        initialInvestment: Float
        finalInvestment: Float
        resultCreated: String
        createdDate: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me(_id: ID!): User
        users: [User]
        user(id: ID!): User
        results(userId: ID!): [Results]
        result(_id: ID!): Results
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addResult(algorithm: String!, stock: String!, startDate: String!, initialInvestment: Float!, finalInvestment: Float!, user: ID!): Results
        removeResult(_id: ID!): Results
    }

`;

module.exports = typeDefs;