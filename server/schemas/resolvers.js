const { User, Results } = require('../models');

// Define the resolvers
const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('results')
        },

    }
};

module.exports = resolvers;