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

    },

    Mutation: {
        // add a user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
    }
};

module.exports = resolvers;