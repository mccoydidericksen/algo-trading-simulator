const { Schema, model } = require('mongoose');

const resultsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    algorithm: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    initialInvestment: {
        type: Number,
        required: true
    },
    finalInvestment: {
        type: Number,
        required: true
    },
    resultCreated: {
        type: String,
        required: true
    },
});

const Results = model('Results', resultsSchema);

module.exports = Results;