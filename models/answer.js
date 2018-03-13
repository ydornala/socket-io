const mongoose = require('mongoose');
const Question = require('./question');

var answerSchema = mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    answer: String
});

var Answers = mongoose.model('answer', answerSchema);

module.exports = Answers;