const { User, Results } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// Define the resolvers
const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('results')
        },
        user: async (parent, { id }) => {
            return User.findOne({ _id: id }).populate('results');
          },
        me: async (parent, {user} ) => {
            const profile = await User.findOne({ _id: user }).populate('results');
            return profile;
          },
        results: async (parent, { userId }) => {
            const params = { user: userId };
            return Results.find(params).sort({ createdAt: -1 });
        },

    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.comparePasswords(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
          addResult: async (parent, { algorithm, stock, startDate, initialInvestment, finalInvestment, user, resultCreated }) => {
            const result = await Results.create({
              algorithm,
              stock,
              startDate,
              initialInvestment,
              finalInvestment,
              user,
              resultCreated
            });
           return result;
          },
    }
};

module.exports = resolvers;