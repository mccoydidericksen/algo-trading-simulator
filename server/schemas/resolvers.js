const { User, Results } = require('../models');

// Import the auth middleware
const auth = require('../utils/auth');

// Define the resolvers
const resolvers = {
    Query: {
        // get one user
        user: async (parent, { username }) => {
            return User.findOne({ username });
        }
    }
};

module.exports = resolvers;