const mongoose = require('mongoose');
const Question = require('./question');

var resultSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    },
    total: Number,
    correctCount: Number
});

var Results = mongoose.model('result', resultSchema);

module.exports = Results;