const mongoose = require('mongoose');
const Section = require('./section');

var questionSchema = mongoose.Schema({
    name: String,
    options: [String],

    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    }
});

var Questions = mongoose.model('question', questionSchema);

module.exports = Questions;