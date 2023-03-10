const db = require('../config/connection');
const { User, Results } = require('../models');
const userData = require('./userData.json');
const resultsData = require('./resultsData.json');

db.once('open', async () => {
    await User.deleteMany({});
    await Results.deleteMany({});
    
    await User.create(userData);
    // await Results.create(resultsData);
    
    console.log('Database seeded!');
    process.exit(0);
    });
